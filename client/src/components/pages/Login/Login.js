import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from '../../../redux/apiRequest/authApiRequest';
import { useDispatch, useSelector } from 'react-redux';

import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function Login() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [isLoading, setIsLoading] = useState(false);
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
        loginUser(newUser, dispatch, navigate, setIsLoading);
    };

    useEffect(() => {
        if(user){
            navigate("/");
        }
    })

    return (
        <div className={cx('bodyLogin')}>
            <section className={cx('login-container')}>
                    <div className={cx('logo')}>
                        <img src={'https://data-mline-congnghemoi.s3.ap-southeast-1.amazonaws.com/logo-no-bg.png'} alt={"logo=MLine"} />
                        <div id={cx("line")}>LINE</div>
                    </div>
                    <div className={cx('login-title')}>Đăng nhập tài khoản MLine</div>
                    <form className={cx('formLogin')} onSubmit={handleLogin}>
                            <div className='col-lg-10'>
                                <label className={cx('lblTK')}>Tài khoản:</label>
                                <input
                                    className={cx('txtTK')}
                                    type="text"
                                    placeholder="Nhập tên tài khoản"
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                    }}
                                /><br/>
                                <label className={cx('lblMK')}>Mật khẩu:</label>
                                <input
                                    className={cx('txtMK')}
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <Link className={cx('forgotpw-link')} to="/forgotpass">
                                    Bạn quên mật khẩu?{' '}
                                </Link>
                            </div>
                        {isLoading ? <p className={cx('currentLogin')}><i>Đang đăng nhập...</i></p> : <button className={cx('btnLogin')} type="submit">ĐĂNG NHẬP</button>}
                        <div className={cx('login-register')}>Bạn chưa có tài khoản?</div>
                        <Link className={cx('login-register-link')} to="/register">
                            Đăng ký ngay{' '}
                        </Link>
                    </form>
            </section>
        </div>
    );
}

export default Login;
