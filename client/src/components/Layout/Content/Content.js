import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../../redux/apiRequest/authApiRequest';
import { createAxios } from '../../../redux/createInstance';
import { logoutSuccess } from '../../../redux/authSlice';
import { RightBar } from '../../Layout';
import { getMsgs } from '../../../redux/apiRequest/chatApiRequest';
import { height } from '@mui/system';

const cx = classNames.bind(styles);

function Content() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const sender = useSelector((state) => state.user.sender?.user);
    const chat = useSelector((state) => state.chat.message?.content);

    const socket = useRef();
    const [message, setMessage] = useState('');
    const [sendMessage, setSendMessage] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = user?._id;
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const popupCenter = ({url, title, w, h}) => {
        // Fixes dual-screen position                             Most browsers      Firefox
        const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;
    
        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : Screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : Screen.height;
    
        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft
        const top = (height - h) / 2 / systemZoom + dualScreenTop
        const newWindow = window.open(url, title, 
          `
          scrollbars=yes,
          width=${w / systemZoom}, 
          height=${h / systemZoom}, 
          top=${top}, 
          left=${left}
          `
        )
    
        if (window.focus) newWindow.focus();
    }
   
    const callPopupFunction = () =>{
        popupCenter({url: '../call', title: 'xtf', w: 500, h: 650});  
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
        logOut(dispatch, navigate, id, accessToken, axiosJWT);
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
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    useEffect(() => {
        const id = {
            sender: sender?._id,
            user: user?._id,
        };
        getMsgs(accessToken, dispatch, id, axiosJWT);
    }, [sender]);

    //SOCKET CHAT
    useEffect(() => {
        const handler = (chatMessage) => {
            setSendData((prev) => {
                return [...prev, chatMessage];
            });
        };
        if (user?.accessToken) {
            socket.current = io('https://real-time-chat-server-123.herokuapp.com', {
                'Access-Control-Allow-Credentials': true,
            });

            socket.current.on('user-chat', handler);

            return () => socket.current.off('user-chat', handler);
        }
    }, [sendData]);

    return (
        <div className={cx('flex-row', 'container-center')}>
            <div className={cx('flex-column', 'main-center')}>
                <div className={cx('flex-row', 'header-center')}>
                    <div className={cx('flex-row', 'info-friend')}>
                        <img
                            src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                            alt="avata"
                        />
                        <div className={cx('flex-column', 'info-content')}>
                            <p>{sender?.firstName}</p>
                            <span>Active</span>
                        </div>
                    </div>

                    <div className={cx('flex-row', 'btn-event')}>
                        <button onClick={() => callPopupFunction() }>Call</button>
                        <button>Video</button>
                        <button className="navbar-logout" onClick={() => handleLogout()}>
                            {' '}
                            Log out
                        </button>
                    </div>
                </div>

                <div className={cx('flex-column', 'body-center')}>
                    <div className={cx('flex-column', 'scroller-column', 'screen-chat')}>
                        <div className={cx('space-height')}></div>
                        <div className={cx('flex-column', 'info-friend-chat')}>
                            <img
                                src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                                alt="avata"
                            />
                            <p>{sender?.firstName}</p>
                            <span>Hãy nói gì đó với tôi</span>
                        </div>
                        <div className={cx('space-height')}></div>
                        <div className={cx('flex-column', 'contain-chat')}>
                            <div className={cx('real-time')}>
                                <span className={cx('time')}>11:20,</span>
                                <span className={cx('date')}>03/08/2000</span>
                            </div>

                            {sendData?.map((mess, index) => {
                                return (
                                    <div key={index} className={cx('flex-column')}>
                                        <div
                                            className={cx('flex-row', mess.sender === id ? 'friend-send' : 'user-send')}
                                        >
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
                                    </div>
                                );
                            })}

                            <div className={cx('flex-row', 'friend-send')}>
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
                            </div>
                            <div className={cx('space-height')}></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={cx('flex-row', 'input-chat')}>
                        <button className={cx('btn-chat', 'file')}>File</button>
                        <div className={cx('input-text')}>
                            <input
                                type="text"
                                placeholder="Input chat ...."
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <button type="submit" className={cx('btn-chat', 'send')}>
                            Gửi
                        </button>
                    </form>
                </div>
            </div>

            <RightBar />

            {/*           
            <ul id="messengers"></ul> */}
            {/* <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />

            </form> */}
            {/* <p>{sender?.userName}</p> */}
        </div>
    );
}

export default Content;
