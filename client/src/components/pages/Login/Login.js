import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from '../../../redux/apiRequest/authApiRequest';
import { useDispatch, useSelector } from 'react-redux';

import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const cx = classNames.bind(styles);

function Login() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const newUser = {
            phoneNumber: phoneNumber,
            password: password,
        };

        loginUser(newUser, dispatch, navigate, setIsLoading);
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    });

    //show-hide-pw
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };

    return (
        <div className={cx('bodyLogin')}>
            <section className={cx('login-container')}>
                <div className={cx('logo')}>
                    <img
                        src={'https://data-mline-congnghemoi.s3.ap-southeast-1.amazonaws.com/logo-no-bg.png'}
                        alt={'logo=MLine'}
                    />
                    <div id={cx('line')}>LINE</div>
                </div>
                <form className={cx('formLogin')} onSubmit={handleLogin}>
                    <div className="col-lg-10">
                        <input
                            className={cx('txtTK')}
                            type="text"
                            placeholder="Tên tài khoản"
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />
                        <br />
                        <input
                            className={cx('txtMK')}
                            type={passwordType}
                            placeholder="Mật khẩu"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordInput(e.target.value);
                            }}
                            value={passwordInput}
                            name="password"
                        />
                        <span className={cx('eyeLogin')}>
                            <div className="btn btn-outline-primary" onClick={togglePassword}>
                                <IconContext.Provider value={{ color: '#D57AD4' }}>
                                    {passwordType === 'password' ? (
                                        <i>
                                            <FaEyeSlash />
                                        </i>
                                    ) : (
                                        <i>
                                            <FaEye />
                                        </i>
                                    )}
                                </IconContext.Provider>
                            </div>
                        </span>
                        <Link className={cx('forgotpw-link')} to="/forgotpass">
                            Bạn quên mật khẩu?{' '}
                        </Link>
                    </div>
                    {isLoading ? (
                        <p className={cx('currentLogin')}>
                            <i>Đang đăng nhập...</i>
                        </p>
                    ) : (
                        <button className={cx('btnLogin')} type="submit">
                            ĐĂNG NHẬP
                        </button>
                    )}
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
