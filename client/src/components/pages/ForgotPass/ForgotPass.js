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

//npm i react-bootstrap
//https://react-bootstrap.github.io/components/tabs/
import {Tab, Tabs, Form} from 'react-bootstrap';

//link firebase doc: https://firebase.google.com/docs/auth/web/phone-auth
import auth from '../../../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

//npm i @react-native-firebase/auth
// import auth from '@react-native-firebase/auth'; //ko

//npm i react-phone-number-input
// import PhoneInput from 'react-phone-number-input';

//npm i react-phone-input-2 styled-components
import styled from 'styled-components/macro';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


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

    //custom phonenumber-input 
    const Wrapper = ({ className, ...props }) => (
        <div className={className}>
            <PhoneInput {...props} />
        </div>
    );
    const Phone = styled(Wrapper)`
        #phone-input {
            border: 1px solid #d57ad4 !important;
        }
    `;

    //OTP firebase 
    const [number, setNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [errorMess, setErrorMess] = useState('');
    const [errorMessOTP, setErrorMessOTP] = useState('');
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState('');
    const getOtp = async (e) => {
        e.preventDefault();
        
        let phoneNumber = '+'+number;
        let regexPhoneNumberVN = /\+?(0|84)\d{9}/.test(phoneNumber);
        if (phoneNumber === '' || phoneNumber === undefined) return setErrorMess('Vui lòng nhập số điện thoại!');
        else if(!regexPhoneNumberVN) setErrorMess('SĐT không hợp lệ!');
        else {
            setErrorMess('');
            // console.log(number);
            try {
                const response = await setUpRecaptcha(phoneNumber);
                console.log(response);
                setConfirmObj(response);
                console.log(phoneNumber);
                setFlag(true);
            } catch (err) {
                // setErrorMess(err.message);
                console.log(err.message);
            }
        }
    }

    const verifyOtp = async (e)=>{
        e.preventDefault();

        if(otp==='' || otp===undefined) setErrorMessOTP('Vui lòng nhập mã xác thực');
        else if(otp.length!==6) setErrorMessOTP('Vui lòng nhập 6 ký tự');
        else {
            setErrorMessOTP('');
            try {
                await confirmObj.confirm(otp);
                console.log(otp);
            } catch (err) {
                // setErrorMessOTP(err.message);
                console.log(err.message);
            }
        }
    }

    function setUpRecaptcha(phoneNumber) {
        //link sub language: https://firebase.google.com/docs/reference/android/com/google/firebase/ml/naturallanguage/translate/FirebaseTranslateLanguage
        // auth.setLanguageCode('vi');
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        recaptchaVerifier.render();
        recaptchaVerifier.verify();
        return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    }

    return (
        <div className={cx('bodyForgotPW')}>
            <section className={cx('forgotpw-container')}>
                <div className={cx('logo')}>
                    <img
                        src="https://raw.githubusercontent.com/Tuan2210/TH_CongNgheMoi/master/data%20MLine/logo-no-bg.png"
                        alt="logoMLine"
                    />
                    <div id={cx('line')}>LINE</div>
                </div>
                {/* <form onSubmit={handleLogin}> */}
                <div className={cx('boxTabs')}>
                    <Tabs
                        className={cx('formTwoTabs')}
                        defaultActiveKey="tabOTP"
                        transition={false}
                        variant="pills"
                        style={{ fontSize: '1rem' }}
                        fill
                    >
                        <Tab eventKey="tabOTP" title="Xác thực SĐT" className={cx('formTabOTP')}>
                            <div className="p-4 box">
                                <Form onSubmit={getOtp} style={{ display: !flag ? 'block' : 'none' }}>
                                    <Form.Group className="mb-3" controlId="formBasicphonenumber">
                                        {/* <PhoneInput
                                            defaultCountry="VN"
                                            // onlyCountries={['vn']}
                                            value={number}
                                            onChange={setNumber}
                                            placeholder="Nhập số điện thoại"
                                            style={{
                                                width: 50,
                                            }}
                                        /> */}
                                        <Phone
                                            country={'vn'}
                                            // onlyCountries={['vn']}
                                            // placeholder="Vui lòng chọn vùng và nhập SĐT"
                                            inputProps={{
                                                id: 'phone-input',
                                                required: true,
                                                autoFocus: true,
                                            }}
                                            autoFormat="true"
                                            value={number}
                                            onChange={setNumber}
                                            style={{ marginLeft: 25 }}
                                        />

                                        <span className={cx('errorMess')}>{errorMess}</span>
                                        <div className={cx('btnsTabOTP')}>
                                            <button type="submit" className={cx('btnSendOTP')}>Gửi mã xác thực</button>
                                            <button className={cx('btnCancel')} onClick={() => setNumber('')}>Hủy</button>
                                        </div>
                                        <div id="recaptcha-container" style={{ marginLeft: 25 }}></div>
                                        <div className={cx('btnsTabOTP')}>
                                            <Link className={cx('comback-login')} to="/login">
                                                ◀ Trở về{' '}
                                            </Link>
                                        </div>
                                    </Form.Group>
                                </Form>
                                <Form onSubmit={verifyOtp} style={{ display: !flag ? 'none' : 'block' }}>
                                    <Form.Group className="mb-3">
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập mã xác nhận"
                                                onChange={(e) => setOtp(e.target.value)}
                                                className={cx('inputOTP')}
                                            ></Form.Control>
                                        </div>
                                        <span className={cx('errorMess')}>{errorMessOTP}</span>
                                        <div className={cx('btnsTabOTP')}>
                                            <button type="submit" className={cx('btnConfirmOTP')}>Xác nhận mã</button>
                                            <button 
                                                className={cx('btnResendOTP')} 
                                                onClick={()=> {window.location.reload();}}>
                                                    Gửi lại mã xác thực
                                            </button>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="tabNewPW" title="Mật khẩu mới" className={cx('formTabPhone')}>
                            <div className={cx('contentTabPhone')}>
                                <div className={cx('rowInputs')}>
                                    <input
                                        className={cx('txtSdtForgotPW')}
                                        placeholder="Số điện thoại"
                                        type="number"
                                        // min={0}
                                        // max={9}
                                        // onChange={(e) => {
                                        //     setUserName(e.target.value);
                                        // }}
                                    />
                                    <span className="iconPhone">
                                        <IconContext.Provider value={{ color: '#D57AD4' }}>
                                            <i>
                                                <IoPhonePortraitOutline size={30} />
                                            </i>
                                        </IconContext.Provider>
                                    </span>
                                </div>
                                <div className={cx('rowInputs')}>
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
                                </div>
                                <div className={cx('rowInputs')}>
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
                            </div>
                            <div className={cx('contentTabPhone')}>
                                <button className={cx('btnNewPW')} type="submit">
                                    XÁC NHẬN
                                </button>
                                {/* <Link className={cx('comback-login')} to="/login">
                                    ◀ Quay lại{' '}
                                </Link> */}
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                {/* <Tabs
                    defaultActiveKey="tabOTP"
                    transition={false}
                    className={cx('formTwoTabs')}
                    // inkBarStyle={{ background: 'red' }}
                    // textColor="secondary"
                    // indicatorColor="secondary"
                    // aria-label="secondary tabs example"
                    variant="pills"
                    justify
                >
                    <Tab eventKey="tabOTP" title="Xác thực số điện thoại" className={cx('formTab')}>
                        <form className={cx('formForgotPW')}>
                            <div className="col-lg-10">
                                <input
                                    className={cx('txtSdtForgotPW')}
                                    placeholder="OTP"
                                    type="number"
                                    min={0}
                                    max={9}
                                    // onChange={(e) => {
                                    //     setUserName(e.target.value);
                                    // }}
                                />
                                <span className="iconPhone">
                                    <IconContext.Provider value={{ color: '#D57AD4' }}>
                                        <i>
                                            <IoPhonePortraitOutline size={30} />
                                        </i>
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
                            <button className={cx('btnNewPW')} type="submit">
                                LẤY LẠI MẬT KHẨU
                            </button>
                            <Link className={cx('comback-login')} to="/login">
                                ◀ Quay lại{' '}
                            </Link>
                        </form>
                    </Tab>
                    <Tab
                        eventKey="tabNewPW"
                        title="Mật khẩu mới"
                        className={cx('formTab')}
                        // disabled
                    >
                        <form className={cx('formForgotPW')}>
                            <div className="col-lg-10">
                                <input
                                    className={cx('txtSdtForgotPW')}
                                    placeholder="Số điện thoại"
                                    type="number"
                                    min={0}
                                    max={9}
                                    // onChange={(e) => {
                                    //     setUserName(e.target.value);
                                    // }}
                                />
                                <span className="iconPhone">
                                    <IconContext.Provider value={{ color: '#D57AD4' }}>
                                        <i>
                                            <IoPhonePortraitOutline size={30} />
                                        </i>
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
                            <button className={cx('btnNewPW')} type="submit">
                                LẤY LẠI MẬT KHẨU
                            </button>
                            <Link className={cx('comback-login')} to="/login">
                                ◀ Quay lại{' '}
                            </Link>
                        </form>
                    </Tab>
                </Tabs> */}
            </section>
        </div>
    );
}

export default ForgotPass;
