import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../../../redux/apiRequest';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            userName: userName,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    };

    return (
        <section className={cx('login-container')}>
            <div className={cx('login-title')}> Log in</div>
            <form onSubmit={handleLogin}>
                <label>USERNAME</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
                <label>PASSWORD</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button type="submit"> Continue </button>
            </form>
            <div className={cx('login-register')}> Don't have an account yet? </div>
            <Link className={cx('login-register-link')} to="/register">
                Register one for free{' '}
            </Link>
        </section>
    );
}

export default Login;
