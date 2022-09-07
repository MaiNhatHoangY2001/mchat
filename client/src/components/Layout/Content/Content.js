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
            socket.current = io('https://realtime-chat-server.onrender.com/');

            const messengers = document.querySelector('#messengers');

            socket.current.on('user-chat', (message) => {
                const chatItem = document.createElement('li');
                chatItem.textContent = `${message.name}: ${message.message}`;
                messengers.appendChild(chatItem);
            });
        }
    }, []);

    return (
        <div>
            <Link to="/logout" className="navbar-logout" onClick={() => handleLogout()}>
                {' '}
                Log out
            </Link>

            <ul id="messengers"></ul>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="chat" onChange={(e) => setMessage(e.target.value)} />
                <button id="send-chat">Gửi</button>
            </form>
        </div>
    );
}

export default Content;
