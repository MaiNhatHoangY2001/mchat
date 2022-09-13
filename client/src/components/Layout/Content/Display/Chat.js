import classNames from 'classnames/bind';
import styles from '../Content.module.scss';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut, url } from '../../../../redux/apiRequest/authApiRequest';
import { createAxios } from '../../../../redux/createInstance';
import { logoutSuccess } from '../../../../redux/authSlice';
import { getIndividualChat, getMsgs } from '../../../../redux/apiRequest/chatApiRequest';
import { popupCenter } from '../PopupCenter';
import { getIndividualChatSuccess, getMessagesSuccess } from '../../../../redux/chatSlice';

const cx = classNames.bind(styles);

function Chat() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const sender = useSelector((state) => state.user.sender?.user);
    const chat = useSelector((state) => state.chat.message?.content);

    const socket = useRef();

    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const id = user?._id;
    const accessToken = user?.accessToken;

    let axiosJWTChats = createAxios(user, dispatch, getIndividualChatSuccess);
    let axiosJWTLogout = createAxios(user, dispatch, logoutSuccess);
    let axiosJWTGetmsg = createAxios(user, dispatch, getMessagesSuccess);

    const callPopupFunction = () => {
        popupCenter({ url: '../call', title: 'xtf', w: 500, h: 650 });
    };

    const [sendData, setSendData] = useState([
        {
            sender: null,
            message: {
                content: null,
                time: null,
            },
        },
    ]);

    const handleLogout = () => {
        logOut(dispatch, navigate, id, accessToken, axiosJWTLogout);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const time = new Date();
        if (message !== '') {
            socket.current.emit('on-chat', {
                sender: sender?._id,
                message: {
                    content: message,
                    time: time,
                },
            });
            setMessage('');
        }
    };

    useEffect(() => {
        setSendData(chat);
    }, [chat]);

    useEffect(() => {
        const id = {
            sender: sender?._id,
            user: user?._id,
        };
        getMsgs(accessToken, dispatch, id, axiosJWTGetmsg);
    }, [sender]);

    //SOCKET CHAT
    useEffect(() => {
        const handler = (chatMessage) => {
            setSendData((prev) => {
                return [...prev, chatMessage];
            });
            getIndividualChat(accessToken, id, dispatch, axiosJWTChats);
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
            <div className={cx('flex-row', 'header-center')}>
                <div className={cx('flex-row', 'info-friend')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt="avata" />
                    <div className={cx('flex-column', 'info-content')}>
                        <p>{sender?.firstName}</p>
                        <span>Active</span>
                    </div>
                </div>

                <div className={cx('flex-row', 'btn-event')}>
                    <button onClick={() => callPopupFunction()}>Call</button>
                    <button>Video</button>
                    <button className="navbar-logout" onClick={() => handleLogout()}>
                        {' '}
                        Log out
                    </button>
                </div>
            </div>

            <div className={cx('flex-column', 'scroller-column', 'body-center')}>
                <div className={cx('space-big-height')}></div>
                <div className={cx('flex-column', 'info-friend-chat')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt="avata" />
                    <p>{sender?.firstName}</p>
                    <span>Hãy nói gì đó với tôi</span>
                </div>
                <div className={cx('space-big-height')}></div>

                <div className={cx('flex-column', 'contain-chat')}>
                    <div className={cx('real-time')}>
                        <span className={cx('time')}>11:20,</span>
                        <span className={cx('date')}>03/08/2000</span>
                    </div>

                    {sendData?.map((mess, index) => {
                        return (
                            <div key={index} className={cx('flex-column')}>
                                <div className={cx('flex-row', mess.sender === id ? 'friend-send' : 'user-send')}>
                                    <img
                                        className={cx('img-chat')}
                                        src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                                        alt="avata"
                                    />
                                    <div className={cx('box-text-chat', 'tooltip')}>
                                        <p className={cx('text-chat')}>{mess.message.content}</p>
                                        <span
                                            className={cx(
                                                'box-tooltip',
                                                mess.sender === id ? 'tooltiptextFriend' : 'tooltiptextUser',
                                            )}
                                        >
                                            {mess.message.time}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('space-height')}></div>
                            </div>
                        );
                    })}

                    {/* <div className={cx('flex-row', 'friend-send')}>
            <img
                className={cx('img-chat')}
                src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                alt="avata"
            />
            <div className={cx('box-text-chat')}>
                <p className={cx('text-chat')}>Mai Ngoc Long Mai Ngoc Long</p>
            </div>
        </div>
        <div className={cx('space-height')}></div>
        <div className={cx('flex-row', 'user-send')}>
            <div className={cx('box-text-chat')}>
                <p className={cx('text-chat')}>Mai Ngoc Long Mai Ngoc Long</p>
            </div>
            <img
                className={cx('img-chat')}
                src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                alt="avata"
            />
        </div> */}
                    <div className={cx('space-height')}></div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className={cx('flex-row', 'input-chat')}>
                <button className={cx('btn-chat', 'file')}>File</button>
                <div className={cx('input-text')}>
                    <input type="text" placeholder="Input chat ...." onChange={(e) => setMessage(e.target.value)} />
                </div>

                <button type="submit" className={cx('btn-chat', 'send')}>
                    Gửi
                </button>
            </form>
        </>
    );
}

export default Chat;
