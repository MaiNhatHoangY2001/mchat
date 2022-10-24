import classNames from 'classnames/bind';
import styles from './ListFriend.scss';
import { useEffect, useState } from 'react';
import AutoComplete from '../AutoComplete';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../../redux/createInstance';
import { addIndividualChatSuccess } from '../../../../redux/chatSlice';
import { searchUser } from '../../../../redux/apiRequest/userApiRequest';
import { setSender } from '../../../../redux/userSlice';
import { getMsgs, getMsgsGroupChat } from '../../../../redux/apiRequest/chatApiRequest';
import { loginSuccess } from '../../../../redux/authSlice';
import { setIsGroupChat } from '../../../../redux/groupChatSlice';
import ReactTooltip from 'react-tooltip';
import { Box, Button, Modal, Tooltip, Typography } from '@mui/material';

const cx = classNames.bind(styles);

export default function ListFriend() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const currentIndividualChat = useSelector((state) => state.chat.individualChat?.actor);
    const currentGroupChat = useSelector((state) => state.groupChat.groupChat?.actor);
    const currentSearch = useSelector((state) => state.user.users?.allUsers);
    const currentSender = useSelector((state) => state.user.sender?.user);

    const [usersSearch, setUsersSearch] = useState([]);
    const [textSearchUser, setTextSearchUser] = useState('');
    const [chatActors, setChatActors] = useState([]);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();
    const accessToken = currentUser?.accessToken;

    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const activeButtonStyles = {
        backgroundColor: 'rgba(243, 163, 173, 1)',
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
        <div className={cx('containerListFriend')}>
            <div className={cx('search')}>
                <p className={cx('titleSearch')}>Tìm kiếm người dùng</p>
                <div className={cx('actionSearch')}>
                    <AutoComplete
                        currentUser={currentUser}
                        users={usersSearch}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Nhập tên người dùng"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    onChange: (e) => {
                                        setTextSearchUser(e.target.value);
                                    },
                                }}
                                defaultValue="Small"
                                size="small"
                            />
                        )}
                    />
                    <Tooltip title="Tạo nhóm" placement="right" disableInteractive arrow>
                        <div className={cx('buttonGroup')} onClick={() => setOpenModal(true)}>
                            <img
                                src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666439594/samples/Icon/group_og7rhr.png`}
                                alt={'avata'}
                            />
                        </div>
                    </Tooltip>
                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={cx('modalGroup')}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <div className={cx('headerModal')}>
                                    <p>Tạo nhóm</p>
                                </div>
                            </Typography>
                            <Typography id="modal-modal-description" className={cx('content')}>
                                <div className={cx('bodyModal')}>
                                    <div className={cx('boxTextInput')}>
                                        <TextField
                                            className={cx('groupName')}
                                            id="standard-basic"
                                            label="Tên nhóm"
                                            size="small"
                                            variant="standard"
                                        />
                                        <TextField
                                            className={cx('groupName')}
                                            id="standard-basic"
                                            label="Tìm kiếm bạn bè"
                                            size="small"
                                        />
                                    </div>
                                </div>
                                <form action="" className={cx('footerModal')}>
                                    <Button color="error" onClick={() => setOpenModal(false)}>
                                        <p>Hủy</p>
                                    </Button>
                                    <Button color="success">
                                        <p>Tạo nhóm</p>
                                    </Button>
                                </form>
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </div>
            <div className={cx('list-item')}>
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
                            className={cx('item')}
                            style={isActorSenderActive ? activeButtonStyles : {}}
                        >
                            <img
                                src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                                alt={'avata'}
                            />
                            <div className={cx('content-item')}>
                                <p>{actor?.sender?.profileName || actor?.groupName}</p>
                                <p className={cx('supchat')}>{/* {newMessage(actor?.message[0])} */}</p>
                            </div>
                            <span className={cx('dot', actor?.status === 'Active' ? 'active' : 'disable')}></span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
