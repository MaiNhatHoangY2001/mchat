import classNames from 'classnames/bind';
import styles from './ListFriend.scss';
import React, { useEffect, useState } from 'react';
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
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    Tooltip,
} from '@mui/material';

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
    const [openModal, setOpenModal] = useState(false);
    const [searchGroup, setSearchGroup] = useState('');

    const dispatch = useDispatch();
    const accessToken = currentUser?.accessToken;

    const [selectData, setSelectData] = useState([]);

    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const activeButtonStyles = {
        backgroundColor: 'rgba(243, 163, 173, 1)',
        color: 'white',
        pointerEvents: 'none',
        userSelect: 'none',
    };

    const dataList = [
        {
            id: 0,
            name: 'Mai Ngọc Long',
            avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1665715205/samples/people/boy-snow-hoodie.jpg',
            sdt: '001',
        },
        {
            id: 1,
            name: 'Phạm Minh Hùng',
            avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1665715203/samples/people/smiling-man.jpg',
            sdt: '002',
        },
        {
            id: 2,
            name: 'Mai Nhật Hoàng',
            avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1665715199/samples/people/kitchen-bar.jpg',
            sdt: '003',
        },
    ];

    const setDataSelect = (event) => {
        setSearchGroup(event.target.value);
    };

    const handleToggle = (item) => () => {
        const currentIndex = selectData
            .map((item1) => {
                return item1.id;
            })
            .indexOf(item.id);
        const newData = [...selectData];

        if (currentIndex === -1) {
            newData.push(item);
        } else {
            newData.splice(currentIndex, 1);
        }
        setSelectData(newData);
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

                    <Modal open={openModal} onClose={() => setOpenModal(false)}>
                        <div className={cx('modalGroup')}>
                            <div className={cx('headerModal')}>
                                <p>Tạo nhóm</p>
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('bodyModal')}>
                                    <div className={cx('boxTextInput')}>
                                        <TextField
                                            className={cx('groupName')}
                                            id="standard-basic"
                                            label="Tên nhóm"
                                            size="small"
                                            variant="standard"
                                            placeholder="Nhập tên nhóm"
                                        />
                                        <TextField
                                            className={cx('groupName')}
                                            id="standard-basic"
                                            label="Tìm kiếm bạn bè"
                                            size="small"
                                            onChange={setDataSelect}
                                            placeholder="Nhập tên hoặc số điện thoại"
                                        />
                                    </div>
                                    <div className={cx('addUserGroup')}>
                                        <div className={cx('listFriendModal')}>
                                            <p>Danh sách bạn bè</p>
                                            <List className={cx('listItem')}>
                                                {dataList.map((item, index) => {
                                                    const name = item.name;
                                                    return name.toLowerCase().includes(searchGroup.toLowerCase()) ? (
                                                        <ListItem key={index} disablePadding>
                                                            <ListItemButton
                                                                role={undefined}
                                                                onClick={handleToggle(item)}
                                                                dense
                                                            >
                                                                <ListItemIcon>
                                                                    <Checkbox
                                                                        edge="start"
                                                                        checked={
                                                                            selectData
                                                                                .map((item1) => {
                                                                                    return item1.id;
                                                                                })
                                                                                .indexOf(item.id) !== -1
                                                                        }
                                                                        tabIndex={-1}
                                                                        disableRipple
                                                                    />
                                                                </ListItemIcon>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <img src={item.avata} alt="avata" />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={item.name} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    ) : (
                                                        <React.Fragment key={index}></React.Fragment>
                                                    );
                                                })}
                                            </List>
                                        </div>
                                        <div className={cx('listFriendSelectModal')}>
                                            <p>Danh sách bạn bè đã chọn {selectData.length}/100</p>
                                            <List className={cx('listItem')}>
                                                {selectData.map((item, index) => {
                                                    return (
                                                        <ListItem
                                                            key={index}
                                                            secondaryAction={
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="comments"
                                                                    onClick={handleToggle(item)}
                                                                >
                                                                    <HighlightOffOutlinedIcon />
                                                                </IconButton>
                                                            }
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <img src={item.avata} alt="avata" />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText primary={item.name} />
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('footerModal')}>
                                    <Button color="error" onClick={() => setOpenModal(false)}>
                                        <p>Hủy</p>
                                    </Button>
                                    <Button color="success">
                                        <p>Tạo nhóm</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
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
