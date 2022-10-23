import classNames from 'classnames/bind';
import styles from '../Content.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../../redux/apiRequest/authApiRequest';
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

    const [individualChatId, setIndividualChatId] = useState('');
    const [message, setMessage] = useState('');
    const [sendData, setSendData] = useState([
        {
            type_Msg: null,
            sender: null,
            message: {
                content: null,
                time: null,
            },
        },
    ]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUserId = user?._id;
    const currentSenderId = sender?._id;
    const accessToken = user?.accessToken;

    let axiosJWTLogout = createAxios(user, dispatch, logoutSuccess);
    let axiosJWTLogin = createAxios(user, dispatch, loginSuccess);

    const callPopupFunction = () => {
        popupCenter({ url: '../call', title: 'xtf', w: 500, h: 650 });
    };

    const handleLogout = () => {
        logOut(dispatch, navigate, currentUserId, accessToken, axiosJWTLogout);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message !== '') {
            createChat(TYPE_MSG, message);
            setMessage('');
        }
    };

    const addMsgImgWithInfo = (url) => {
        createChat(TYPE_IMG, url);
    };

    const createChat = (typeChat, mess) => {
        const time = new Date();
        const newChat = {
            sender: currentUserId,
            receiver: currentSenderId,
            message: {
                type_Msg: typeChat,
                content: mess,
                time: time,
            },
            isNewChat: false,
            senderName: sender.profileName,
        };

        if (sendData.length <= 0) {
            newChat.isNewChat = true;
        }

        addMsg(typeChat, mess);

        socket.current.emit('on-chat', newChat);
        //delete receiver property
        delete newChat.receiver;
        delete newChat.isNewChat;
        delete newChat.senderName;
        //add chat on content
        setSendData((prev) => [...prev, newChat]);
    };

    const addMsg = (typeChat, mess) => {
        if (!isGroupChat) {
            if (sendData.length <= 0) {
                addChat4NewUser(typeChat, mess);
            } else {
                addMsgWithInfo(typeChat, mess);
            }
        } else {
            addMsgWithInfoGroupChat(typeChat, mess);
        }
    };

    //
    const addChat4NewUser = (typeChat, mess) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
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

    const addMsgWithInfoGroupChat = (typeChat, mess) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
            groupChat: currentSenderId,
            userGroupChat: currentUserId,
        };

        addMessage(msg, accessToken, dispatch, axiosJWTLogin);
    };

    const addMsgWithInfo = (typeChat, mess) => {
        const msg = {
            type_Msg: typeChat,
            content: mess,
            individualChat: individualChatId,
        };

        addMessage(msg, accessToken, dispatch, axiosJWTLogin);
    };

    const convertTime = (time) => {
        const formattedDate = moment(time).utcOffset('+0700').format('HH:mm DD [tháng] MM, YYYY');

        return formattedDate;
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

            if (chatMessage.sender === currentSenderId && chatMessage.receiver === currentUserId) {
                setSendData((prev) => {
                    return [...prev, chatMessage];
                });
            }

            //displaying a notification
            if (chatMessage.receiver === currentUserId) {
                Push.create(chatMessage.senderName, {
                    body: chatMessage.message.content,
                    silent: true,
                });
                Push.clear();
            }
        };
        if (user?.accessToken) {
            socket.current = io(url, {
                'Access-Control-Allow-Credentials': true,
            });

            socket.current.on('user-chat', handler);
            return () => socket.current.off('user-chat', handler);
        }
    }, [sendData]);
    return (
        <>
            <div className={cx('headerChat')}>
                <div className={cx('infoFriend')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt="avata" />
                    <div className={cx('infoText')}>
                        {<p>{sender?.profileName}</p>}
                        <span>Active</span>
                    </div>
                </div>

                <div className={cx('flex-row', 'btn-event')}>
                    <button onClick={() => callPopupFunction()}>Call</button>
                    <button onClick={() => callPopupFunction()}>Video</button>
                    <button className="navbar-logout" onClick={() => handleLogout()}>
                        {' '}
                        Log out
                    </button>
                    <button onClick={setRightBar.handleClickSetRightBar}>Info</button>
                </div>
            </div>

            <div className={cx('flex-column', 'scroller-column', 'body-center')}>
                <div className={cx('space-big-height')}></div>
                <div className={cx('flex-column', 'info-friend-chat')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt="avata" />
                    <p>{sender?.profileName}</p>
                    <span>Hãy nói gì đó với tôi</span>
                </div>
                <div className={cx('space-big-height')}></div>

                <div className={cx('flex-column', 'contain-chat')}>
                    {sendData === null ? (
                        <LoadingChat />
                    ) : (
                        sendData?.map((mess, index) => {
                            return (
                                <div key={index} className={cx('flex-column')}>
                                    <div
                                        className={cx(
                                            'flex-row',
                                            mess.sender === currentUserId ? 'user-send' : 'friend-send',
                                        )}
                                    >
                                        <img
                                            className={cx('img-chat')}
                                            src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                                            alt="avata"
                                        />
                                        <div className={cx('box-text-chat', 'tooltip')}>
                                            {/* <p className={cx('text-chat')}>{mess.message.content}</p> */}
                                            {mess.message?.type_Msg === TYPE_MSG ? (
                                                <p className={cx('text-chat')}>{mess.message.content}</p>
                                            ) : (
                                                <img alt="not fount" width={'20px'} src={mess.message.content} />
                                            )}

                                            <span
                                                className={cx(
                                                    'box-tooltip',
                                                    mess.sender === currentUserId
                                                        ? 'tooltiptextUser'
                                                        : 'tooltiptextFriend',
                                                )}
                                            >
                                                {convertTime(mess.message.time)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('space-height')}></div>
                                </div>
                            );
                        })
                    )}

                    <div className={cx('space-height')}></div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className={cx('flex-row', 'input-chat')}>
                <input
                    type="file"
                    id="selectedFile"
                    name="myImage"
                    accept="image/*"
                    className={cx('btn-chat', 'file')}
                    onChange={async (event) => {
                        const bodyFormData = new FormData();
                        bodyFormData.append('file', event.target.files[0]);
                        const image = await uploadFile(accessToken, dispatch, axiosJWTLogin, bodyFormData);
                        addMsgImgWithInfo(image.url);
                    }}
                    style={{ display: 'none' }}
                />
                <input
                    type="button"
                    value="Browse..."
                    onClick={() => document.getElementById('selectedFile').click()}
                />

                <div className={cx('input-text')}>
                    <input
                        type="text"
                        placeholder="Input chat ...."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <button type="submit" className={cx('btn-chat', 'send')}>
                    Gửi
                </button>
            </form>
        </>
    );
}

export default Chat;
