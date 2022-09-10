import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../../redux/apiRequest';
import { createAxios } from '../../../redux/createInstance';
import { logoutSuccess } from '../../../redux/authSlice';

const cx = classNames.bind(styles);

function Content() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const socket = useRef();
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = user?._id;
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = () => {
        logOut(dispatch, navigate, id, accessToken, axiosJWT);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.current.emit('on-chat', { name, message });
        setMessage('');
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (user?.accessToken) {
            socket.current = io('https://real-time-chat-server-123.herokuapp.com', {
                'Access-Control-Allow-Credentials': true,
            });

            const messengers = document.querySelector('#messengers');

            socket.current.on('user-chat', (message) => {
                const chatItem = document.createElement('li');
                chatItem.textContent = `${message.name}: ${message.message}`;
                messengers.appendChild(chatItem);
            });
        }
    }, []);

    return (
        <div className={cx('flex-row', 'container-center')}>
            <div className={cx('flex-column', 'main-center')}>
                <div className={cx('flex-row', 'header-center')}>
                    <div className={cx('flex-row', 'info-friend')}>
                        <img 
                            src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} 
                            alt="avata" />
                        <div className={cx('flex-column', 'info-content')}>
                            <p>Mai Ngoc Long</p>
                            <span>Active</span>
                        </div>
                    </div>

                    <div className={cx('flex-row', 'btn-event')}>
                        <button>Call</button>
                        <button>Video</button>
                    </div>
                </div>

                <div className={cx('flex-column', 'body-center')}>
                    <div className={cx('flex-column', 'scroller-column', 'screen-chat')}>
                        <div className={cx('space-height')}></div>
                        <div className={cx('flex-column', 'info-friend-chat')}>
                            <img 
                                src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                                alt="avata" />
                            <p>Mai Long Long</p>
                            <span>Hãy nói gì đó với tôi</span>
                        </div>
                        <div className={cx('space-height')}></div>
                        <div className={cx('flex-column', 'contain-chat')}>
                            <div className={cx('real-time')}>
                                <span className={cx('time')}>11:20,</span>
                                <span className={cx('date')}>03/08/2000</span>
                            </div>
                            <div className={cx('flex-row', 'friend-send')}>
                                <img 
                                    className={cx('img-chat')} 
                                    src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} 
                                    alt="avata" />
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
                                    alt="avata" />
                            </div>
                            <div className={cx('space-height')}></div>
                        </div>
                    </div>

                    <div className={cx('flex-row', 'input-chat')}>
                        <button className={cx('btn-chat', 'file')}>File</button>
                        <div className={cx('input-text')}>
                            <input type="text" placeholder="Input chat ...." />
                        </div>
                        <button className={cx('btn-chat', 'send')}>Send</button>
                    </div>
                </div>
            </div>

            <div className={cx('main-right')}>

            </div>
            {/* 
            <button className="navbar-logout" onClick={() => handleLogout()}>
                {' '}
                Log out
            </button>
            <ul id="messengers"></ul>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="chat" onChange={(e) => setMessage(e.target.value)} />
                <button id="send-chat">Gửi</button>
            </form>
             */}
        </div>
    );
}

export default Content;
