import styles from './LeftBar.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import AutoComplete from './AutoComplete';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../redux/createInstance';
import { addIndividualChatSuccess } from '../../../redux/chatSlice';
import { searchUser } from '../../../redux/apiRequest/userApiRequest';
import { setSender } from '../../../redux/userSlice';
import { getMsgs, getMsgsGroupChat } from '../../../redux/apiRequest/chatApiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import { fontSize } from '@mui/system';
import { setIsGroupChat } from '../../../redux/groupChatSlice';

const cx = classNames.bind(styles);

function LeftBar() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const currentIndividualChat = useSelector((state) => state.chat.individualChat?.actor);
    const currentGroupChat = useSelector((state) => state.groupChat.groupChat?.actor);
    const currentSearch = useSelector((state) => state.user.users?.allUsers);
    const currentSender = useSelector((state) => state.user.sender?.user);

    const [usersSearch, setUsersSearch] = useState([]);
    const [textSearchUser, setTextSearchUser] = useState('');
    const [chatActors, setChatActors] = useState([]);
    const [isShowMenu, setIsShowMenu] = useState(false);

    const dispatch = useDispatch();
    const accessToken = currentUser?.accessToken;

    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const activeButtonStyles = {
        backgroundColor: 'rgb(242, 153, 227)',
        color: 'white',
        pointerEvents: 'none',
        userSelect: 'none',
    };

    const handleClick = async (individualId, sender, userId, isGroupChat) => {
        if (!isGroupChat) {
            const apiSent = {
                sender: sender?._id,
                user: userId,
            };
            getMsgs(accessToken, dispatch, apiSent, axiosJWT);
            dispatch(addIndividualChatSuccess(individualId));
            dispatch(setIsGroupChat(false));
        } else {
            const apiSent = {
                groupId: sender?._id,
            };
            getMsgsGroupChat(accessToken, dispatch, apiSent, axiosJWT);
            dispatch(setIsGroupChat(true));
        }

        dispatch(setSender(sender));
    };

    const menuPopUp = () => {
        setIsShowMenu((prev) => !prev);
    };

    useEffect(() => {
        if (currentIndividualChat !== null) {
            const listChat = currentIndividualChat.concat(currentGroupChat);
            const listSort = listChat.sort(function (a, b) {
                return new Date(b.message[0]?.time) - new Date(a.message[0]?.time);
            });
            setChatActors(listSort);
        }
    }, [currentIndividualChat, currentGroupChat]);

    useEffect(() => {
        const search = textSearchUser === '' ? '@' : textSearchUser;
        searchUser(accessToken, dispatch, search, axiosJWT);
        if (currentSearch !== null) {
            setUsersSearch(currentSearch?.filter((user) => user.profileName !== currentUser.profileName));
        }
    }, [textSearchUser]);

    return (
        <div className={cx('flex-column', 'container-left')}>
            <div className={cx('flex-column', 'avata-search')}>
                <div className={cx('avata')} onClick={menuPopUp}>
                    <img
                        src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                        alt={'avata'}
                    ></img>
                    <div className={cx('user-name')}>{currentUser?.profileName}</div>
                </div>

                <div className={cx('flex-row', 'input-search')}>
                    <div className={cx('search')}>
                        <AutoComplete
                            currentUser={currentUser}
                            users={usersSearch}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search input"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                        onChange: (e) => {
                                            setTextSearchUser(e.target.value);
                                        },
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('flex-column', 'scroller-column', 'list-item')}>
                {chatActors?.map((actor, index) => {
                    const isActorSenderActive = currentSender?._id === (actor?.sender?._id || actor?._id);
                    const isGroupChat = actor?.sender?._id === undefined;
                    const actorGroupChat = {
                        _id: actor?._id,
                        profileName: actor?.groupName,
                    };

                    return (
                        <button
                            key={index}
                            id="button-item"
                            onClick={() =>
                                handleClick(actor?._id, actor?.sender || actorGroupChat, actor?.user, isGroupChat)
                            }
                            className={cx('flex-row', 'item')}
                            style={isActorSenderActive ? activeButtonStyles : {}}
                        >
                            <img
                                src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                                alt={'avata'}
                            />
                            <div className={cx('flex-column', 'content-item')}>
                                <p>{actor?.sender?.profileName || actor?.groupName}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default LeftBar;
