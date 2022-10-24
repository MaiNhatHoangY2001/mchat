import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from '../../../redux/apiRequest/authApiRequest';
import { useDispatch, useSelector } from 'react-redux';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'; //npm i react-hook-form

import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {IoPhonePortraitOutline} from 'react-icons/io5';
import { IconContext } from 'react-icons/lib';
import React from 'react';
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

    //check regex sdt
    const [errorMessSDT, setErrorMessSDT] = useState('');
    let isNum = /^\d+$/.test(phoneNumber.trim());
    let regexPhoneNumber = /\+?(0|84)\d{9}/.test(phoneNumber.trim());
    function checkPhoneNumber() {
        if(phoneNumber.trim() === '') 
            setErrorMessSDT(errorMessSDT => errorMessSDT = 'Vui lòng nhập số điện thoại!');
        else if(!isNum) setErrorMessSDT('Vui lòng nhập lại số điện thoại!');
        else if(phoneNumber.trim().length !== 10 ) setErrorMessSDT('Vui lòng nhập đủ 10 ký tự số điện thoại!');
        else if(!regexPhoneNumber) setErrorMessSDT('SĐT không hợp lệ!');
        else
            // setErrorMessSDT(errorMessSDT => errorMessSDT = '✅');
            setErrorMessSDT('');
    }

    //check input pw
    const [errorMessPW, setErrorMessPW] = useState('');
    function checkPW() {
        if(password.trim() === '') setErrorMessPW('Vui lòng nhập mật khẩu');
        else if(password.trim().length < 6) setErrorMessPW('Mật khẩu phải tối thiểu 6 ký tự');
        else setErrorMessPW('');
    }

    //check data inputs
    function checkDataInputs() {
        checkPhoneNumber();
        checkPW();
    }

    return (
        <div className={cx('bodyLogin')}>
            <section className={cx('login-container')}>
                <div className={cx('logo')}>
                    <img src={'https://raw.githubusercontent.com/Tuan2210/TH_CongNgheMoi/master/data%20MLine/logo-no-bg.png'} alt={'logoMLine'}/>
                    <div id={cx('line')}>LINE</div>
                </div>
                <form className={cx('formLogin')} onSubmit={handleLogin}>
                    <div className="col-lg-10">
                        <input
                            className={cx('txtSDT')}
                            placeholder="Số điện thoại"
                            type="text"
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />
                        <span className="iconPhone">
                            <IconContext.Provider value={{ color: '#D57AD4' }}>
                                <i><IoPhonePortraitOutline size={30}/></i>
                            </IconContext.Provider>
                        </span>
                        {/* {errors.inputPhoneNumber && <p className={cx('errorMessSDT')}>{errors.inputPhoneNumber.message}</p>} */}
                        <p className={cx('errorMess')}>{errorMessSDT}</p>
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
                            <div className="btn btn-outline-info" onClick={togglePassword}>
                                <IconContext.Provider value={{ color: '#D57AD4' }}>
                                    {passwordType === 'password' ? (<i><FaEyeSlash/></i>) : (<i><FaEye /></i>)}
                                </IconContext.Provider>
                            </div>
                        </span>
                        <p className={cx('errorMess')}>{errorMessPW}</p>
                        <Link className={cx('forgotpw-link')} to="/forgotpass">
                            Bạn quên mật khẩu?{' '}
                        </Link>
                    </div>
                    {isLoading ? (
                            <p className={cx('currentLogin')}><i>Đang đăng nhập...</i></p>
                        ) : (
                            <button 
                                className={cx('btnLogin')} 
                                type="submit"
                                onClick={checkDataInputs}
                            >ĐĂNG NHẬP</button>
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
