import styles from './ForgotPass.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons/lib';
import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function ForgotPass() {
    //show-hide-pw
    const [passwordInputNewPW, setPasswordInputNewPW] = useState('');
    const [passwordInputConfirmNewPW, setPasswordInputConfirmNewPW] = useState('');
    const [passwordType1, setPasswordType1] = useState('password');
    const [passwordType2, setPasswordType2] = useState('password');
    const togglePassword1 = () => {
        if (passwordType1 === 'password') {
            setPasswordType1('text');
            return;
        } 
        setPasswordType1('password');
    };
    const togglePassword2 = () => {
        if (passwordType2 === 'password') {
            setPasswordType2('text');
            return;
        }
        setPasswordType2('password');
    };

    return (
        <div className={cx('bodyForgotPW')}>
            <section className={cx('forgotpw-container')}>
                <div className={cx('logo')}>
                    <img
                        src={
                            'https://raw.githubusercontent.com/Tuan2210/TH_CongNgheMoi/master/data%20MLine/logo-no-bg.png'
                        }
                        alt={'logoMLine'}
                    />
                    <div id={cx('line')}>LINE</div>
                </div>
                {/* <form onSubmit={handleLogin}> */}
                <form className={cx('formForgotPW')}>
                    <div className="col-lg-10">
                        <input
                            className={cx('txtSdtForgotPW')}
                            type="text"
                            placeholder="Số điện thoại"
                            // onChange={(e) => {
                            //     setUserName(e.target.value);
                            // }}
                        />
                        <span className="iconPhone">
                            <IconContext.Provider value={{ color: '#D57AD4' }}>
                                <i><IoPhonePortraitOutline size={30} /></i>
                            </IconContext.Provider>
                        </span>
                        <input
                            className={cx('txtNewPW')}
                            type={passwordType1}
                            placeholder="Mật khẩu mới"
                            onChange={(e) => {
                                // setPassword(e.target.value);
                                setPasswordInputNewPW(e.target.value);
                            }}
                            value={passwordInputNewPW}
                            name="password"
                        />
                        <span className="eye1">
                            <div className="btn btn-outline-info" onClick={togglePassword1}>
                                <IconContext.Provider value={{ color: '#D57AD4' }}>
                                    {passwordType1 === 'password' ? (
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
                        <input
                            className={cx('txtConfirmNewPW')}
                            type={passwordType2}
                            placeholder="Xác nhận mật khẩu mới"
                            onChange={(e) => {
                                setPasswordInputConfirmNewPW(e.target.value);
                            }}
                            value={passwordInputConfirmNewPW}
                            name="password"
                        />
                        <span className="eye2">
                            <div className="btn btn-outline-info" onClick={togglePassword2}>
                                <IconContext.Provider value={{ color: '#D57AD4' }}>
                                    {passwordType2 === 'password' ? (
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
                    </div>
                    {/* {isLoading ? <p><i>Đang đăng nhập...</i></p> : */}{' '}
                    <button className={cx('btnNewPW')} type="submit">
                        LẤY LẠI MẬT KHẨU
                    </button>
                    <Link className={cx('comback-login')} to="/login">
                        ◀ Quay lại{' '}
                    </Link>
                </form>
            </section>
        </div>
    );
}

export default ForgotPass;
