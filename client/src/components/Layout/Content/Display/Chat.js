import classNames from 'classnames/bind';
import styles from '../Content.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../../redux/createInstance';
import { loginSuccess } from '../../../../redux/authSlice';
import { getMsgs, getMsgsGroupChat } from '../../../../redux/apiRequest/chatApiRequest';
import { popupCenter } from '../PopupCenter';
import LoadingChat from '../../Loading/LoadingChat';
import { uploadFile } from '../../../../redux/apiRequest/fileApiRequest';
import moment from 'moment';
import Picker from 'emoji-picker-react';
import { ChatContext } from '../../../../context/ChatContext';
import { TYPE_IMG, TYPE_MSG, TYPE_NOTIFICATION } from '../../../../context/TypeChat';
import {
    Avatar,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    TextField,
    Tooltip,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import KeyIcon from '@mui/icons-material/Key';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { Box } from '@mui/system';

const cx = classNames.bind(styles);

const DataGroupDemo = {
    id: 0,
    name: 'Nhóm 16',
    admin: 0,
    avataGroup: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1665715210/samples/imagecon-group.jpg',
    listUser: [
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
            name: 'Huấn Hoa Hồng',
            avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar5_vtoheb.png',
        },
        {
            id: 8,
            name: 'Huấn Hoa Hồng',
            avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar5_vtoheb.png',
        },
        {
            id: 9,
            name: 'Huấn Hoa Hồng',
            avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar5_vtoheb.png',
        },
        {
            id: 10,
            name: 'Huấn Hoa Hồng',
            avata: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1666966662/Avata/avatar5_vtoheb.png',
        },
    ],
};

function ChildModal({ onPress }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton onClick={handleOpen}>
                <KeyIcon />
            </IconButton>
            <Modal hideBackdrop open={open} onClose={handleClose}>
                <div className={cx('modalDialog')}>
                    <div className={cx('modalTitle')}>
                        <p>Xác nhận</p>
                    </div>
                    <div className={cx('modalContent')}>
                        <p>Chuyển quyền trưởng nhóm cho người này?</p>
                    </div>
                    <div className={cx('modalButton')}>
                        <Button size="small" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button size="small" onClick={onPress}>
                            Đồng ý
                        </Button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
}

function Chat() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const sender = useSelector((state) => state.user.sender?.user);
    const chat = useSelector((state) => state.chat.message?.content);
    const individualChat = useSelector((state) => state.chat.individualChat);
    const isGroupChat = useSelector((state) => state.groupChat?.groupChat.isGroupChat);
    // const urlImage = useSelector((state) => state.file?.upload?.url.url);

    const chatContext = useContext(ChatContext);
    const createChat = chatContext.createChat;
    const setSendData = chatContext.setSendData;
    const sendData = chatContext.sendData;
    const setIndividualChatId = chatContext.setIndividualChatId;

    const bottomRef = useRef(null);

    const [changeNameGroup, setChangeNameGroup] = useState(DataGroupDemo.name);
    const [isDataGroup, setDataGroup] = useState(DataGroupDemo.admin);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [message, setMessage] = useState('');
    const [isListUser, setListUser] = useState(DataGroupDemo.listUser);

    const dispatch = useDispatch();

    const currentUserId = user?._id;
    const currentSenderId = sender?._id;
    const accessToken = user?.accessToken;

    let axiosJWTLogin = createAxios(user, dispatch, loginSuccess);

    const handleRemoveUser = (item) => {
        const index = isListUser
            .map((item1) => {
                return item1.id;
            })
            .indexOf(item.id);
        const newData = [...isListUser];
        newData.splice(index, 1);
        setListUser(newData);
    };

    const setNameGroup = (event) => {
        setChangeNameGroup(event.target.value);
    };

    const handleSetKeyAdmin = (value) => () => {
        setDataGroup(value);
        DataGroupDemo.admin = value;
    };

    const callPopupFunction = () => {
        popupCenter({ url: '../call', title: 'xtf', w: 500, h: 650 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message !== '') {
            createChat(TYPE_MSG, message, []);
            setMessage('');
        }
    };

    const addMsgImgWithInfo = (url) => {
        createChat(TYPE_IMG, '', url);
    };

    const convertTime = (time) => {
        const formattedDate = moment(time).utcOffset('+0700').format('HH:mm DD [tháng] MM, YYYY');

        return formattedDate;
    };
    //POP THE EMOJI PICKER UP
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const emojiPicker = (event, emojiObject) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const typeChat = (type, mess) => {
        switch (type) {
            case TYPE_MSG:
                return <p className={cx('textChat')}>{mess.message.content}</p>;
            case TYPE_IMG:
                return imgChat(mess.message?.imageContent.length, mess.message?.imageContent);
            case TYPE_NOTIFICATION:
                return <p className={cx('textChat')}>{mess.message.content}</p>;
        }
    };

    const imgChat = (length, images) => {
        const chatImage = (srcGroup) =>
            images?.map((img, index) => {
                return <img key={index} alt="not fount" width={'20px'} src={img + srcGroup} />;
            });

        if (length > 0) {
            switch (length) {
                case 1:
                    return chatImage('');
                default:
                    return <div className={cx('groupImage')}>{chatImage('?w=164&h=164&fit=crop&auto=format')}</div>;
            }
        } else return <img alt="not fount" width={'20px'} src={''} />;
    };

    //SAVE MSG WHEN RELOAD PAGE
    useEffect(() => {
        if (!isGroupChat) {
            const apiSent = {
                sender: currentSenderId,
                user: currentUserId,
            };
            if (window.performance) {
                if (performance.navigation.type == 1) {
                    getMsgs(accessToken, dispatch, apiSent, axiosJWTLogin);
                }
            }
        } else {
            const apiSent = {
                groupId: currentSenderId,
            };
            getMsgsGroupChat(accessToken, dispatch, apiSent, axiosJWTLogin);
        }
    }, []);

    useEffect(() => {
        setIndividualChatId(individualChat.idChat);
    }, [individualChat.idChat]);

    useEffect(() => {
        setSendData(chat);
    }, [chat]);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [sendData]);

    return (
        <>
            <div className={cx('headerChat')}>
                <div className={cx('infoFriend')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt="avata" />
                    <div className={cx('infoText')}>
                        {<p className={cx('name')}>{sender?.profileName}</p>}
                        <span className={cx('active')}>Đang hoạt động</span>
                    </div>
                </div>

                <ul className={cx('ListButton')}>
                    <Tooltip title="Gọi điện" placement="left" disableInteractive arrow>
                        <li className={cx('button')} onClick={() => callPopupFunction()}>
                            <CallIcon sx={{ fontSize: 30 }} />
                        </li>
                    </Tooltip>
                    <Tooltip title="Gọi điện video" placement="left" disableInteractive arrow>
                        <li className={cx('button')} onClick={() => callPopupFunction()}>
                            <VideoCallIcon sx={{ fontSize: 30 }} />
                        </li>
                    </Tooltip>
                    <Tooltip title="Các chức năng" placement="left" disableInteractive arrow>
                        <li className={cx('button')} onClick={handleOpen}>
                            <DragIndicatorIcon sx={{ fontSize: 30 }} />
                        </li>
                    </Tooltip>
                    <Modal open={open} onClose={handleClose}>
                        <div className={cx('modalMain')}>
                            <div className={cx('titleModal')}>
                                <p>Thông tin nhóm</p>
                            </div>
                            <div className={cx('modalHeader')}>
                                <div className={cx('AvataAndImage')}>
                                    <img src={DataGroupDemo.avataGroup} alt={DataGroupDemo.name} />
                                </div>
                                <div className={cx('updateInfo')}>
                                    <Button size="small" variant="contained" startIcon={<CameraAltIcon />}>
                                        Cập nhật ảnh đại diện
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                    <TextField
                                        className={cx('updateNameGroup')}
                                        fullWidth
                                        size="small"
                                        variant="standard"
                                        placeholder="Nhập tên nhóm"
                                        value={changeNameGroup}
                                        onChange={setNameGroup}
                                    />
                                </div>
                            </div>
                            <div className={cx('modalBody')}>
                                <Button size="small" variant="contained" startIcon={<GroupAddIcon />}>
                                    Thêm thành viên
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                                <div className={cx('ListUserGroup')}>
                                    <p>Danh sách thành viên:</p>
                                    <List className={cx('ListUser')}>
                                        {isListUser.map((item, index) => {
                                            const name =
                                                isDataGroup === item.id ? item.name + ' (Trưởng nhóm)' : item.name;
                                            const admin = isDataGroup === item.id ? false : true;
                                            const showbutton = isDataGroup === 0 ? true : false;
                                            return (
                                                <ListItem key={index}>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <img src={item.avata} alt={item.name} />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={name} />

                                                    {showbutton && admin ? (
                                                        <ListItemIcon>
                                                            <ChildModal onPress={handleSetKeyAdmin(item.id)} />

                                                            <IconButton onClick={() => handleRemoveUser(item)}>
                                                                <GroupRemoveIcon />
                                                            </IconButton>
                                                        </ListItemIcon>
                                                    ) : (
                                                        <React.Fragment></React.Fragment>
                                                    )}
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </div>
                            </div>
                            <div className={cx('modalFooter')}>
                                <Button
                                    variant="text"
                                    color="success"
                                    startIcon={<CheckCircleIcon />}
                                    onClick={handleClose}
                                >
                                    Xác nhận
                                </Button>
                                <Button variant="text" color="error" startIcon={<LogoutIcon />}>
                                    Rời nhóm
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </ul>
            </div>

            <div className={cx('bodyCenter')}>
                <div className={cx('infoFriendChat')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt="avata" />
                    <p>{sender?.profileName}</p>
                </div>

                <div className={cx('containChat')}>
                    <div className={cx('timeChat')}>
                        <p className={cx('time')}>19:53, 7 Tháng 10, 2022</p>
                    </div>

                    {sendData === null ? (
                        <LoadingChat />
                    ) : (
                        sendData?.map((mess, index) => {
                            const nameSender = mess.message.userGroupChat?.profileName || sender?.profileName;
                            const nameUser = user?.profileName;

                            return (
                                <React.Fragment key={index}>
                                    <div className={cx(mess.sender === currentUserId ? 'userSend' : 'friendSend')}>
                                        <img
                                            className={cx('imgChat')}
                                            src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                                            alt="avata"
                                        />
                                        <Tooltip
                                            title={convertTime(mess.message.time)}
                                            placement="right"
                                            disableInteractive
                                            arrow
                                        >
                                            <div className={cx('boxTextChat')}>
                                                <p className={cx('textUserName')}>
                                                    {mess.sender === currentUserId ? nameUser : nameSender}
                                                </p>
                                                {typeChat(mess.message?.type_Msg, mess)}
                                            </div>
                                        </Tooltip>
                                        <div className={cx('boxEdite')}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })
                    )}

                    <div ref={bottomRef} />
                </div>
            </div>

            <form onSubmit={handleSubmit} className={cx('inputChat')} encType={'multipart/form-data'}>
                <input
                    type="file"
                    id="selectedFile"
                    name="myImage"
                    accept="image/*"
                    multiple
                    onChange={async (event) => {
                        const bodyFormData = new FormData();
                        const files = event.target.files;

                        for (let index = 0; index < files.length; index++) {
                            bodyFormData.append('file', files[index]);
                        }
                        const image = await uploadFile(accessToken, dispatch, axiosJWTLogin, bodyFormData);
                        window.setTimeout(async function () {
                            //wait upload image on google cloud
                            await addMsgImgWithInfo(image.url);
                        }, 1000);
                    }}
                    style={{ display: 'none' }}
                />

                {/* Button image */}
                <div
                    className={cx('buttonInput')}
                    type="button"
                    onClick={() => document.getElementById('selectedFile').click()}
                >
                    <img
                        src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666526090/samples/Icon/photo_yn6nra.png`}
                        alt="file"
                    />
                </div>

                {/* Butotn file */}
                <div className={cx('buttonInput')} type="button">
                    <img
                        src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666602452/samples/Icon/document_mzbsif.png`}
                        alt="file"
                    />
                </div>
                <div className={cx('inputText')}>
                    <input type="text" placeholder="Aa" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <img
                        className={cx('iconPicker')}
                        src={`https://res.cloudinary.com/dxwhrjno5/image/upload/v1666631419/Images/220-2207946_png-file-svg-white-emoji-icon-png-transparent_pr7qbl.jpg`}
                        alt="file"
                        onClick={() => setShowPicker((val) => !val)}
                    />
                    {showPicker && (
                        <Picker
                            pickerStyle={{ width: '25%', position: 'absolute', top: 5 }}
                            onEmojiClick={{ emojiPicker }}
                        />
                    )}
                </div>

                <div type="submit" className={cx('buttonInput')}>
                    {message === '' ? (
                        <img
                            src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666528392/samples/Icon/like1_tz3tql.png`}
                            alt="like and send"
                        />
                    ) : (
                        <img
                            src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666602121/samples/Icon/send2_llk6si.png`}
                            alt="like and send"
                        />
                    )}
                </div>
            </form>
        </>
    );
}

export default Chat;
