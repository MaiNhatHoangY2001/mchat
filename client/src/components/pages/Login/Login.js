import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from '../../../redux/apiRequest/authApiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'; //npm i react-hook-form

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
            // phoneNumber: phoneNumberValue,
            // password: pwValue,
        };

        loginUser(newUser, dispatch, navigate, setIsLoading);

        //hàm check regex sdt
        const onSubmit = (data) => console.log(data);
        handleSubmit(onSubmit);
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    });

    const {register, handleSubmit, getValues, formState: {errors}} = useForm();
    const onSubmit = (data) => console.log(data);
    const onError = (errors, e) => console.log(errors, e);
   
    console.log(errors);

    //xử lý nhiều hàm handle trong onSubmit
    const onSaveAllSubmits = (e) => {
        e.preventDefault();
        
        handleLogin(e);
        handleSubmit(onSubmit);
    }

    const phoneNumberValue = getValues('inputPhoneNumber');
    const pwValue = getValues('password');

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
                    <img src={'https://raw.githubusercontent.com/Tuan2210/TH_CongNgheMoi/master/data%20MLine/logo-no-bg.png'} alt={'logoMLine'}/>
                    <div id={cx('line')}>LINE</div>
                </div>
                <form 
                    className={cx('formLogin')} 
                    //onSubmit={handleSubmit(onSubmit)} //regex sđt
                    onSubmit={handleLogin}
                >
                    <div className="col-lg-10">
                        <input
                            className={cx('txtSDT')}
                            placeholder="Số điện thoại"
                            type="text"
                            // min={0}
                            {...register('inputPhoneNumber', {
                                // valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: 'Vui lòng nhập số điện thoại'
                                },
                                min: {
                                    value: 0,
                                    message: 'Vui lòng không nhập số âm!',
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'Vui lòng nhập đủ 10 ký tự số điện thoại!',
                                },
                                pattern: {
                                    value: /\+?(0|84)\d{9,10}/,
                                    message: 'SĐT không hợp lệ, vui lòng nhập lại!'
                                }
                            })}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />
                        <span className="iconPhone">
                            <IconContext.Provider value={{ color: '#D57AD4' }}>
                                <i><IoPhonePortraitOutline size={30}/></i>
                            </IconContext.Provider>
                        </span>
                        {errors.inputPhoneNumber && <p className={cx('errorMess')}>{errors.inputPhoneNumber.message}</p>}
                        <input
                            className={cx('txtMK')}
                            type={passwordType}
                            placeholder="Mật khẩu"
                            {...register('password')}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordInput(e.target.value);
                            }}
                            value={passwordInput}
                            // name="password"
                        />
                        <span className={cx('eyeLogin')}>
                            <div className="btn btn-outline-info" onClick={togglePassword}>
                                <IconContext.Provider value={{ color: '#D57AD4' }}>
                                    {passwordType === 'password' ? (<i><FaEyeSlash/></i>) : (<i><FaEye /></i>)}
                                </IconContext.Provider>
                            </div>
                        </span>
                        {/* <p className={cx('errorMess')}>Lỗi mk</p> */}
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
                                // onClick={(e) => {handleLogin(e)}}
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
