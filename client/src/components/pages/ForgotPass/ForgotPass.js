import styles from './ForgotPass.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons/lib';
import React from 'react';

//npm i react-bootstrap
//https://react-bootstrap.github.io/components/tabs/
import { Tab, Tabs, Form } from 'react-bootstrap';

//link firebase doc: https://firebase.google.com/docs/auth/web/phone-auth
import auth from '../../../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

//npm i react-phone-number-input
// import PhoneInput from 'react-phone-number-input';

//npm i react-phone-input-2 styled-components
import styled from 'styled-components/macro';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { changePassword } from '../../../redux/apiRequest/userApiRequest';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function ForgotPass() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const [activeTab, setActiveTab] = useState(1); //active tab
    const [disableTab1, setDisableTab1] = useState(false);
    const [disableTab2, setDisableTab2] = useState(true);
    // const [handleMoveTab, setHandleMoveTab] = useState({ activeTab });
    //
    const [number, setNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [errorMess, setErrorMess] = useState('');
    const [errorMessOTP, setErrorMessOTP] = useState('');
    const [changeTabMess, setchangeTabMess] = useState('');
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState('');
    const getOtp = async (e) => {
        e.preventDefault();

        let phoneNumber = '+' + number.trim();
        let regexPhoneNumberVN = /\+?(0|84)\d{9}/.test(phoneNumber);
        if (phoneNumber === '' || phoneNumber === undefined) return setErrorMess('Vui l??ng nh???p s??? ??i???n tho???i!');
        else if (!regexPhoneNumberVN) setErrorMess('S??T kh??ng h???p l???!');
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
    };

    const verifyOtp = async (e) => {
        e.preventDefault();

        if (otp === '' || otp === undefined) setErrorMessOTP('Vui l??ng nh???p m?? x??c th???c!');
        else if (otp.length !== 6) setErrorMessOTP('Vui l??ng nh???p 6 k?? t???!');
        else {
            setErrorMessOTP('');
            try {
                await confirmObj.confirm(otp);
                console.log(otp);
                
                setActiveTab(2);
                // setHandleMoveTab(2);
                setDisableTab1(true);
                setDisableTab2(false);
                setchangeTabMess("???? x??c th???c, vui l??ng chuy???n ?????n tab 'M???t kh???u m???i'");
            } catch (err) {
                // setErrorMessOTP(err.message);
                console.log(err.message);
            }
        }
    };

    function setUpRecaptcha(phoneNumber) {
        //link sub language: https://firebase.google.com/docs/reference/android/com/google/firebase/ml/naturallanguage/translate/FirebaseTranslateLanguage
        // auth.setLanguageCode('vi');
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        recaptchaVerifier.render();
        recaptchaVerifier.verify();
        return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    }

    //check regex inputs new pw
    const [errorMessNewPW1, setErrorMessNewPW1] = useState('');
    const [errorMessNewPW2, setErrorMessNewPW2] = useState('');
    const [errorMessNewPW3, setErrorMessNewPW3] = useState('');
    const [phoneTabNewPW, setPhoneTabNewPW] = useState('');
    let isNum = /^\d+$/.test(phoneTabNewPW.trim());
    let regexPhoneNumber = /\+?(0|84)\d{9}/.test(phoneTabNewPW.trim());
    function checkPhoneNumber() {
        if (phoneTabNewPW.trim() === '') setErrorMessNewPW1('Vui l??ng nh???p s??? ??i???n tho???i!');
        else if (!isNum) setErrorMessNewPW1('Vui l??ng nh???p l???i s??? ??i???n tho???i!');
        else if (phoneTabNewPW.trim().length !== 10) setErrorMessNewPW1('Vui l??ng nh???p ????? 10 k?? t??? s??? ??i???n tho???i!');
        else if (!regexPhoneNumber) setErrorMessNewPW1('S??T kh??ng h???p l???!');
        // setErrorMessNewPW('???');
        else setErrorMessNewPW1('');
    }
    function checkNewPW() {
        if (passwordInputNewPW.trim() === '') setErrorMessNewPW2('Vui l??ng nh???p m???t kh???u m???i!');
        else if (passwordInputNewPW.trim().length < 6) setErrorMessNewPW2('Vui l??ng nh???p t???i thi???u 6 k?? t???!');
        else setErrorMessNewPW2('');
    }
    function checkConfirmNewPW(e) {
        e.preventDefault();
        if (passwordInputConfirmNewPW.trim() === '') setErrorMessNewPW3('Vui l??ng nh???p x??c nh???n m???t kh???u m???i!');
        else if (passwordInputConfirmNewPW.trim().length < 6) setErrorMessNewPW3('Vui l??ng nh???p t???i thi???u 6 k?? t???!');
        else if (!passwordInputNewPW.trim().includes(passwordInputConfirmNewPW.trim()))
            setErrorMessNewPW3('M???t kh???u x??c nh???n kh??ng ????ng, vui l??ng nh???p l???i!');
        else {
            setErrorMessNewPW3('');
            handleChangePW(e);
        }
    }
    function checkDataInputs(e) {
        e.preventDefault();
        checkPhoneNumber();
        checkNewPW();
        checkConfirmNewPW(e);
    }

    // CHANGE PASSWORD
    const handleChangePW = (e) => {
        e.preventDefault();
        const account = {
            phoneNumber: phoneTabNewPW.trim(),
            newPassword: passwordInputNewPW.trim(),
        };
        changePassword(account, dispatch);
        console.log(account);
        if(account) navigate('/');
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
                <div className={cx('boxTabs')}>
                    <Tabs
                        className={cx('formTwoTabs')}
                        defaultActiveKey={activeTab}
                        transition={false}
                        variant="pills"
                        style={{ fontSize: '1rem' }}
                        fill
                    >
                        <Tab eventKey={1} title="X??c th???c S??T" className={cx('formTabOTP')} disabled={disableTab1}>
                            <div className="p-4 box">
                                <Form onSubmit={getOtp} style={{ display: !flag ? 'block' : 'none' }}>
                                    <Form.Group className="mb-3" controlId="formBasicphonenumber">
                                        <Phone
                                            country={'vn'}
                                            // onlyCountries={['vn']}
                                            // placeholder="Vui l??ng ch???n v??ng v?? nh???p S??T"
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
                                            <button type="submit" className={cx('btnSendOTP')}>
                                                G???i m?? x??c th???c
                                            </button>
                                            <button className={cx('btnCancel')} onClick={() => setNumber('')}>
                                                H???y
                                            </button>
                                        </div>
                                        <div id="recaptcha-container" style={{ marginLeft: 25 }}></div>
                                        <div className={cx('btnsTabOTP')}>
                                            <Link className={cx('comback-login')} to="/login">
                                                ??? Tr??? v??? trang ????ng nh???p{' '}
                                            </Link>
                                        </div>
                                    </Form.Group>
                                </Form>
                                <Form onSubmit={verifyOtp} style={{ display: !flag ? 'none' : 'block' }}>
                                    <Form.Group className="mb-3">
                                        <div
                                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Nh???p m?? x??c th???c"
                                                onChange={(e) => setOtp(e.target.value)}
                                                className={cx('inputOTP')}
                                            ></Form.Control>
                                        </div>
                                        <span className={cx('errorMess')}>{errorMessOTP}</span>
                                        <span className={cx('changeTabMess')}>{changeTabMess}</span>
                                        <div className={cx('btnsTabOTP')}>
                                            <button
                                                type="submit"
                                                className={cx('btnConfirmOTP')}
                                                // onClick={() => setHandleMoveTab(2)}
                                            >
                                                X??c nh???n m??
                                            </button>
                                            <button
                                                className={cx('btnResendOTP')}
                                                onClick={() => {
                                                    window.location.reload();
                                                }}
                                            >
                                                G???i l???i m?? x??c th???c
                                            </button>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="M???t kh???u m???i" className={cx('formTabPhone')} disabled={disableTab2}>
                            <Form onSubmit={checkDataInputs}>
                                <div className={cx('contentTabPhone')}>
                                    <div className={cx('rowInputs')}>
                                        <input
                                            className={cx('txtSdtForgotPW')}
                                            placeholder="S??? ??i???n tho???i"
                                            type="text"
                                            onChange={(e) => {
                                                setPhoneTabNewPW(e.target.value);
                                            }}
                                        />
                                        <span className="iconPhone">
                                            <IconContext.Provider value={{ color: '#D57AD4' }}>
                                                <i>
                                                    <IoPhonePortraitOutline size={30} />
                                                </i>
                                            </IconContext.Provider>
                                        </span>
                                    </div>
                                    <p className={cx('errorMessNewPW')}>{errorMessNewPW1}</p>
                                    <div className={cx('rowInputs')}>
                                        <input
                                            className={cx('txtNewPW')}
                                            type={passwordType1}
                                            placeholder="M???t kh???u m???i"
                                            onChange={(e) => {
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
                                    <p className={cx('errorMessNewPW')}>{errorMessNewPW2}</p>
                                    <div className={cx('rowInputs')}>
                                        <input
                                            className={cx('txtConfirmNewPW')}
                                            type={passwordType2}
                                            placeholder="X??c nh???n m???t kh???u m???i"
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
                                    <p className={cx('errorMessNewPW')}>{errorMessNewPW3}</p>
                                </div>
                                <div className={cx('contentTabPhone-btn')}>
                                    <p className={cx('combackTabOTP')} onClick={() => window.location.reload()}>
                                        ??? Tr??? v???
                                    </p>
                                    <button className={cx('btnNewPW')} type="submit">
                                        X??C NH???N
                                    </button>
                                </div>
                            </Form>
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </div>
    );
}

export default ForgotPass;
