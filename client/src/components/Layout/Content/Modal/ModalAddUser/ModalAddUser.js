import {
    Avatar,
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
    TextField,
} from '@mui/material';
import classNames from 'classnames/bind';
import React, { useContext, useState } from 'react';
import styles from './ModalAddUser.scss';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { ChatContext } from '../../../../../context/ChatContext';

const cx = classNames.bind(styles);

export default function ModalAddUser({ currentGroupChat, closeModal, isModalAddUser }) {
    const chatContext = useContext(ChatContext);
    const listFriend = chatContext.listFriend;
    const sendText4JoinGroup = chatContext.sendText4JoinGroup;

    // Event Search change list user
    const [isSearchGroup, setSearchGroup] = useState('');

    const handleChangeSearchGroup = () => (event) => {
        setSearchGroup(event.target.value);
    };

    // Event Checkbox and Event add user from list to useState list
    const [isListSelect, setListSelect] = useState([]);
    const handleToggle = (item) => () => {
        const currentIndex = isListSelect
            .map((item1) => {
                return item1._id;
            })
            .indexOf(item._id);
        const newData = [...isListSelect];

        if (currentIndex === -1) {
            newData.push(item);
        } else {
            newData.splice(currentIndex, 1);
        }
        setListSelect(newData);
    };
    const handleClickAddUser = () => {
        if (isListSelect.length > 0) {
            console.log(isListSelect);
            console.log(currentGroupChat);
        }
        closeModal();
        //sendText4JoinGroup()
    };

    const listAddUser = (listFriend, listUserInGroupChat) => {
        const isUserInGroupChat = (userId) => {
            return listUserInGroupChat.some((item) => item._id === userId);
        };

        const list = listFriend.filter((user) => !isUserInGroupChat(user?.sender._id));

        return list;
    };

    return (
        <Modal open={isModalAddUser} onClose={closeModal}>
            <div className={cx('modalDialog')}>
                <div className={cx('modalTitle')}>
                    <p>Thêm thành viên nhóm</p>
                </div>
                <div className={cx('modalContent')}>
                    <TextField
                        label="Tìm kiếm thành viên"
                        placeholder="Tìm kiếm theo tên hoặc theo số điện thoại"
                        size="small"
                        fullWidth
                        variant="outlined"
                        onChange={handleChangeSearchGroup()}
                    />
                    <div className={cx('ContainListUser')}>
                        <div className={cx('ListUser')}>
                            <p>Danh Sách bạn bè</p>
                            <List className={cx('listItem')}>
                                {listAddUser(listFriend, currentGroupChat?.user).map((item, index) => {
                                    const name = item?.sender?.profileName;

                                    return name.toLowerCase().includes(isSearchGroup.toLowerCase()) ? (
                                        <ListItem key={index} disablePadding>
                                            <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        size="small"
                                                        edge="start"
                                                        checked={
                                                            isListSelect
                                                                .map((item1) => {
                                                                    return item1._id;
                                                                })
                                                                .indexOf(item._id) !== -1
                                                        }
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <img src={item?.sender?.profileImg} alt="avata" />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText size="small" primary={name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ) : (
                                        <React.Fragment key={index}></React.Fragment>
                                    );
                                })}
                            </List>
                        </div>
                        <div className={cx('ListUserSelect')}>
                            <p>Danh Sách bạn bè đã chọn</p>
                            <List className={cx('listItem')}>
                                {isListSelect.map((item, index) => {
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
                                                    <img src={item?.sender?.profileImg} alt="avata" />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item?.sender?.profileName} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                    </div>
                </div>
                <div className={cx('modalButton')}>
                    <Button size="small" onClick={closeModal}>
                        Hủy
                    </Button>
                    <Button size="small" onClick={handleClickAddUser}>
                        Đồng ý
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
