import classNames from 'classnames/bind';
import styles from '../Content.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import io from 'socket.io-client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios, url } from '../../../../redux/createInstance';
import { loginSuccess, logoutSuccess } from '../../../../redux/authSlice';
import {
    addIndividualChat4NewUser,
    addMessage,
    getListIndividualChat,
    getMsgs,
    getMsgsGroupChat,
} from '../../../../redux/apiRequest/chatApiRequest';
import { popupCenter } from '../PopupCenter';
import LoadingChat from '../../Loading/LoadingChat';
import { uploadFile } from '../../../../redux/apiRequest/fileApiRequest';
import Push from 'push.js';
import moment from 'moment';
import Data from './DataHeaderButtonChat';
import Picker from 'emoji-picker-react';
import { Modal, Tooltip } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const cx = classNames.bind(styles);

const TYPE_MSG = 0;
const TYPE_IMG = 1;

function Chat({ setRightBar }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const sender = useSelector((state) => state.user.sender?.user);
    const chat = useSelector((state) => state.chat.message?.content);
    const individualChat = useSelector((state) => state.chat.individualChat);
    const isGroupChat = useSelector((state) => state.groupChat?.groupChat.isGroupChat);
    // const urlImage = useSelector((state) => state.file?.upload?.url.url);

    const socket = useRef();
    const bottomRef = useRef(null);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [individualChatId, setIndividualChatId] = useState('');
    const [message, setMessage] = useState('');
    const [sendData, setSendData] = useState([
        {
            type_Msg: null,
            sender: null,
            message: {
                content: null,
                time: null,
                imageContent: [],
            },
        },
    ]);

    const dispatch = useDispatch();

    const currentUserId = user?._id;
    const currentSenderId = sender?._id;
    const accessToken = user?.accessToken;

    let axiosJWTLogin = createAxios(user, dispatch, loginSuccess);

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

    const createChat = (typeChat, mess, imageContent) => {
        const time = new Date();
        const newChat = {
            sender: currentUserId,
            receiver: currentSenderId,
            message: {
                type_Msg: typeChat,
                content: mess,
                imageContent: imageContent,
                time: time,
            },
            isNewChat: false,
            isGroupChat: isGroupChat,
            senderName: sender.profileName,
        };

        if (sendData.length <= 0) {
            newChat.isNewChat = true;
        }

        addMsg(typeChat, mess, imageContent);

        socket.current.emit('on-chat', newChat);
        //delete receiver property
        delete newChat.receiver;
        delete newChat.isNewChat;
        delete newChat.senderName;
        delete newChat.isGroupChat;
        //add chat on content
        setSendData((prev) => [...prev, newChat]);
    };

    const addMsg = (typeChat, mess, imageContent) => {
        if (!isGroupChat) {
            if (sendData.length <= 0) {
                addChat4NewUser(typeChat, mess, imageContent);
            } else {
                addMsgWithInfo(typeChat, mess, imageContent);
            }
        } else {
            addMsgWithInfoGroupChat(typeChat, mess, imageContent);
        }
    };

    //
    const addChat4NewUser = (typeChat, mess, imageContent) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
            imageContent: imageContent,
        };
        const indiviSender = {
            sender: currentUserId,
            status: 'Active',
            chatStatus: 0,
            user: currentSenderId,
        };
        const indiviUser = {
            sender: currentSenderId,
            status: 'Active',
            chatStatus: 0,
            user: currentUserId,
        };

        addIndividualChat4NewUser(accessToken, msg, indiviUser, indiviSender, dispatch, axiosJWTLogin);
        window.setTimeout(function () {
            //add chat finish before get one second
            getListIndividualChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
        }, 1000);
    };

    const addMsgWithInfoGroupChat = (typeChat, mess, imageContent) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
            imageContent: imageContent,
            groupChat: currentSenderId,
            userGroupChat: currentUserId,
        };

        addMessage(msg, accessToken, dispatch, axiosJWTLogin);
    };

    const addMsgWithInfo = (typeChat, mess, imageContent) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
            imageContent: imageContent,
            individualChat: individualChatId,
        };

        addMessage(msg, accessToken, dispatch, axiosJWTLogin);
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

    //SOCKET CHAT
    useEffect(() => {
        const handler = (chatMessage) => {
            if (chatMessage.isNewChat) {
                window.setTimeout(function () {
                    //add chat finish before get one second
                    getListIndividualChat(accessToken, currentUserId, dispatch, axiosJWTLogin);
                }, 1000);
            }

            if (chatMessage.isGroupChat) {
                if (chatMessage.receiver === currentSenderId && chatMessage.sender !== currentUserId) {
                    setSendData((prev) => {
                        return [...prev, chatMessage];
                    });
                }
            } else {
                if (chatMessage.sender === currentSenderId && chatMessage.receiver === currentUserId) {
                    setSendData((prev) => {
                        return [...prev, chatMessage];
                    });
                }
            }

            // //displaying a notification
            // if (chatMessage.receiver === currentUserId) {
            //     Push.create(chatMessage.senderName, {
            //         body: chatMessage.message.content,
            //         silent: true,
            //     });
            //     Push.clear();
            // }
        };
        if (user?.accessToken) {
            socket.current = io(url, {
                'Access-Control-Allow-Credentials': true,
            });

            socket.current.on('user-chat', handler);
            return () => socket.current.off('user-chat', handler);
        }
    }, [sendData]);

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
                            <h1>Text in a modal</h1>
                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
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
                            const nameSender = sender?.profileName;
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
                                                {mess.message?.type_Msg === TYPE_MSG ? (
                                                    <p className={cx('textChat')}>{mess.message.content}</p>
                                                ) : (
                                                    imgChat(
                                                        mess.message?.imageContent.length,
                                                        mess.message?.imageContent,
                                                    )
                                                )}
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
                </div>
                <div ref={bottomRef} />
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
                        window.setTimeout(function () {
                            //wait upload image on google cloud
                            addMsgImgWithInfo(image.url);
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
