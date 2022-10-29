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
import React, { useState } from 'react';
import styles from './ModalAddUser.scss';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const cx = classNames.bind(styles);

const DataListFriend = [
    {
        id: 0,
        name: 'Sơn Tùng MTP',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar2_abehs5.png',
    },
    {
        id: 1,
        name: 'Jack 5 Triệu',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar6_cfpsfq.png',
    },
    {
        id: 2,
        name: 'Dương Lâm Đông Nai',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966663/Avata/thumb-1920-233306_wgsosk.jpg',
    },
    {
        id: 3,
        name: 'HieuThuHai',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/img_avatar2_ldxfoe.png',
    },
    {
        id: 4,
        name: 'Đạt Vi Na',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/img_avatar_byssaa.png',
    },
    {
        id: 5,
        name: 'Huấn Hoa Hồng',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar5_vtoheb.png',
    },
    {
        id: 6,
        name: 'Trấn Thành',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar5_vtoheb.png',
    },
    {
        id: 8,
        name: 'Hoài Linh',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar5_vtoheb.png',
    },
    {
        id: 9,
        name: 'Bùi Anh Tuấn',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar5_vtoheb.png',
    },
    {
        id: 10,
        name: 'Tùng Sơn',
        avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar5_vtoheb.png',
    },
];

export default function ModalAddUser({}) {
    // Open and Close Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
                return item1.id;
            })
            .indexOf(item.id);
        const newData = [...isListSelect];

        if (currentIndex === -1) {
            newData.push(item);
        } else {
            newData.splice(currentIndex, 1);
        }
        setListSelect(newData);
    };

    return (
        <React.Fragment>
            <Button size="small" variant="contained" startIcon={<GroupAddIcon />} onClick={handleOpen}>
                Thêm thành viên
                <input hidden accept="image/*" multiple type="file" />
            </Button>
            <Modal hideBackdrop open={open} onClose={handleClose}>
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
                                    {DataListFriend.map((item, index) => {
                                        const name = item.name;

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
                    <div className={cx('modalButton')}>
                        <Button size="small" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button size="small" onClick={handleClose}>
                            Đồng ý
                        </Button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
}
