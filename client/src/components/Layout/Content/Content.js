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

const cx = classNames.bind(styles);

function Content() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const sender = useSelector((state) => state.user.sender?.user);

    const socket = useRef();
    const [message, setMessage] = useState('');
    const [sendMessage, setSendMessage] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = user?._id;
    const accessToken = user?.accessToken;
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const sendData = [
        { mess: 'test1', time: new Date(2022, 3, 25, 5, 4, 4, 2), id: 0 },
        { mess: 'test2', time: new Date(2022, 3, 23, 5, 4, 4, 2), id: 1 },
        { mess: 'hello test', time: new Date(2022, 3, 27, 5, 4, 4, 2), id: 0 },
    ];

    const handleLogout = () => {
        logOut(dispatch, navigate, id, accessToken, axiosJWT);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.current.emit('on-chat', { id: user?._id, message });
        setMessage('');
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    useEffect(() => {
        if (user?.accessToken) {
            socket.current = io('https://real-time-chat-server-123.herokuapp.com', {
                'Access-Control-Allow-Credentials': true,
            });

            socket.current.on('user-chat', (mess) => {
                console.log(mess);
            });
        }
    });

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
                        <button>Call</button>
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

                            {sendData
                                .sort(function (a, b) {
                                    return new Date(a.time) - new Date(b.time);
                                })
                                .map((mess, index) => {
                                    return (
                                        <div key={index} className={cx('flex-column')}>
                                            <div
                                                
                                                className={cx('flex-row', mess.id === 1 ? 'friend-send' : 'user-send')}>
                                                <img
                                                    className={cx('img-chat')}
                                                    src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                                                    alt="avata"
                                                />
                                                <div className={cx('box-text-chat', 'tooltip')}>
                                                    <p className={cx('text-chat')}>{mess.mess}</p>
                                                    <span className={ cx('box-tooltip', mess.id === 1 ? 'tooltiptextFriend' : 'tooltiptextUser')}>11:16, 9 tháng 10, 2022</span>
                                                </div>
                                            </div>
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
                            </div>
                            <div className={cx('space-height')}></div> */}
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
