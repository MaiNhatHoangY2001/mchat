import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../../redux/apiRequest/authApiRequest';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs, Form } from 'react-bootstrap';

import auth from '../../../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import styled from 'styled-components/macro';
import PhoneInput from 'react-phone-input-2';
import { getAllNumber } from '../../../redux/apiRequest/userApiRequest';

const cx = classNames.bind(styles);
function Register() {
    const user = useSelector((state) => state.auth.login?.currentUser)

    const allNumber = useSelector((state) => state.user?.users?.allNumber)

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const handleRegister = (e) => {
        e.preventDefault()
        const newUser = {
            phoneNumber: '0' + phoneNumber.slice(2, 12),
            password: passwordInputNewPW,
            profileName: name,
            date: '',
            refreshToken: '',
        }
        registerUser(newUser, dispatch, navigate, setIsLoading)
        window.setTimeout(function () {
            //login when sign up one second
            handleLogin(phoneNumber, passwordInputNewPW);
            navigate('/');
        }, 1000);
    };

    const handleLogin = (phoneNumber, password) => {
        const newUser = {
            phoneNumber: phoneNumber,
            password: password,
        };

        loginUser(newUser, dispatch, navigate, setIsLoading);
    };

    useEffect(() => {
        console.log('running');
        if (user) {
            navigate('/');
        }
    });

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

    const [activeTab, setActiveTab] = useState(1);
    const [disableTab1, setDisableTab1] = useState(false);
    const [disableTab2, setDisableTab2] = useState(true);

    const [otp, setOtp] = useState('');
    const [errorMessOTP, setErrorMessOTP] = useState('');
    const [changeTabMess, setchangeTabMess] = useState('');
    const [errorMess, setErrorMess] = useState('');
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState('');

    const getOtp = async (e) => {
        e.preventDefault();

        let phoneNum = '+' + phoneNumber.trim();
        let regexPhoneNumberVN = /\+?(0|84)\d{9}/.test(phoneNum);
        if (phoneNum === '' || phoneNum === undefined) return setErrorMess('Vui lòng nhập số điện thoại');
        else if (!regexPhoneNumberVN) setErrorMess('Số điện thoại không hợp lệ');

        else if( allNumber.includes(('0' +phoneNumber.slice(2,12)))){
            setErrorMess('Số điện thoại đã được đăng kí! Vui lòng dùng số khác.')}
        else {
            setErrorMess('');
            try {
                const response = await setUpRecaptcha(phoneNum);
                setConfirmObj(response);
                setFlag(true);
            } catch (err) {
                console.log(err.message);
            }
        }
    };

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
    const verifyOtp = async (e) => {
        e.preventDefault();

        if (otp === '' || otp === undefined) setErrorMessOTP('Vui lòng nhập mã xác thực!');
        else if (otp.length !== 6) setErrorMessOTP('Vui lòng nhập 6 ký tự!');
        else {
            setErrorMessOTP('');
            try {
                await confirmObj.confirm(otp);
                console.log(otp);
                setActiveTab(2);
                setDisableTab1(true);
                setDisableTab2(false);
                setchangeTabMess("Đã xác thực, vui lòng chuyển đến Tab 'Đăng ký'!'");
            } catch (err) {
                console.log(err.message);
            }
        }
    };
    function setUpRecaptcha(phoneNumber) {
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        recaptchaVerifier.render();
        recaptchaVerifier.verify();
        return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    }

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [errorMessNewUser1, setErrorMessNewUser1] = useState('');
    const [errorMessNewUser2, setErrorMessNewUser2] = useState('');
    const [errorMessNewUser3, setErrorMessNewUser3] = useState('');
    const [errorMessNewUser4, setErrorMessNewUser4] = useState('');
    let isNum = /^\d+$/.test(phoneNumber.trim());
    let regexPhoneNumber = /\+?(0|84)\d{9}/.test(phoneNumber.trim());
    function checkPhoneNumber() {
        if (phoneNumber.trim() === '') setErrorMessNewUser1('Vui lòng nhập số điện thoại!');
        else if (!isNum) setErrorMessNewUser1('Vui lòng nhập lại số điện thoại!');
        else if (phoneNumber.trim().length !== 10) setErrorMessNewUser1('Vui lòng nhập đủ 10 ký tự số điện thoại!');
        else if (!regexPhoneNumber) setErrorMessNewUser1('SĐT không hợp lệ!');
        else setErrorMessNewUser1('');
    }
    function checkNewPW() {
        if (passwordInputNewPW.trim() === '') setErrorMessNewUser2('Vui lòng nhập mật khẩu mới!');
        else if (passwordInputNewPW.trim().length < 6) setErrorMessNewUser2('Vui lòng nhập tối thiểu 6 ký tự!');
        else setErrorMessNewUser2('');
    }
    function checkConfirmNewPW() {
        if (passwordInputConfirmNewPW.trim() === '') setErrorMessNewUser3('Vui lòng nhập mật khẩu mới!');
        else if (passwordInputConfirmNewPW.trim().length < 6) setErrorMessNewUser3('Vui lòng nhập tối thiểu 6 ký tự!');
        else if (!passwordInputNewPW.trim().includes(passwordInputConfirmNewPW.trim()))
            setErrorMessNewUser3('Mật khẩu xác nhận không đúng, vui lòng nhập lại!');
        else {
            setErrorMessNewUser3('');
        }
    }
    function checkName(e) {
        e.preventDefault();
        if (name.trim() === '') setErrorMessNewUser4('Vui lòng nhập tên của bạn!');
        else if (name.trim().length < 1) setErrorMessNewUser2('Vui lòng nhập tối thiểu 2 ký tự!');
        else {
            setErrorMessNewUser4('');
            handleRegister(e);
        }
    }
    function checkDataInputs(e) {
        e.preventDefault();
        checkPhoneNumber();
        checkNewPW();
        checkConfirmNewPW();
        checkName(e);
    }

    useEffect(() => {
        getAllNumber(dispatch);
    }, [])

    return (
        // <body>
        <section className={cx('register-container')}>
            <div className={cx('boxTabs')}>
                <Tabs
                    defaultActiveKey={activeTab}
                    transition={false}
                    variant="pills"
                    fill
                >
                    <Tab eventKey={1} title="Xác thực SDT" className={cx('TabOTP')} disabled={disableTab1}>
                        <div>
                            <Form onSubmit={getOtp} style={{ display: !flag ? 'block' : 'none' }}>
                                <Form.Group>
                                    <div
                                        style={{
                                            width: 300,
                                            marginLeft: 150,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <div className={cx('logo')}>
                                            <img
                                                src="https://raw.githubusercontent.com/Tuan2210/TH_CongNgheMoi/master/data%20MLine/logo-no-bg.png"
                                                alt="logoMLine"
                                            />
                                            <div id={cx('line')}>LINE</div>
                                        </div>
                                    </div>
                                    <h2 className={cx('info')} style={{ marginTop: -50 }}>
                                        VUI LÒNG NHẬP SỐ ĐIỆN THOẠI
                                    </h2>{' '}
                                    <br />
                                    <div className={cx('TabOTP')}>
                                        <Phone
                                            country={'vn'}
                                            inputProps={{
                                                id: 'phone-input',
                                                required: true,
                                                autoFocus: true,
                                            }}
                                            // className={cx('inputSDTOTP')}
                                            autoFormat="true"
                                            value={phoneNumber}
                                            onChange={setPhoneNumber}
                                            style={{ marginLeft: 25 }}
                                        />
                                    </div>
                                    <span className={cx('errorMess')}>{errorMess}</span>
                                    <div id="recaptcha-container" style={{ marginLeft: 160 }}></div>
                                    <br></br>
                                    <div className={cx('btnsTabOTP')} style={{ marginTop: -10 }}>
                                        <button type="submit" className={cx('btnSendOTP')}>
                                            Gửi mã xác thực
                                        </button>
                                        <button className={cx('btnCancel')} onClick={() => setPhoneNumber('')}>
                                            Hủy
                                        </button>
                                    </div>
                                    <div className={cx('btnsTabOTP')}>
                                        <Link className={cx('comback-login')} to="/login">
                                            Quay lại{' '}
                                        </Link>
                                    </div>
                                </Form.Group>
                            </Form>
                            <Form onSubmit={verifyOtp} style={{ display: !flag ? 'none' : 'block' }}>
                                <Form.Group className="mb-3">
                                    <div
                                        style={{
                                            width: 300,
                                            marginLeft: 150,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <div className={cx('logo')}>
                                            <img
                                                src="https://raw.githubusercontent.com/Tuan2210/TH_CongNgheMoi/master/data%20MLine/logo-no-bg.png"
                                                alt="logoMLine"
                                            />
                                            <div id={cx('line')}>LINE</div>
                                        </div>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập mã xác nhận"
                                            onChange={(e) => setOtp(e.target.value)}
                                            className={cx('inputmaOTP')}
                                        />
                                    </div>
                                    <span className={cx('errorMess')}>{errorMessOTP}</span>
                                    <span className={cx('changeTabMess')}>{changeTabMess}</span>
                                    <div className={cx('btnsTabOTP')}>
                                        <button type="submit" className={cx('btnConfirmOTP')}>
                                            Xác nhận mã
                                        </button>
                                        <button
                                            className={cx('btnResendOTP')}
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                        >
                                            Gửi lại mã xác thực
                                        </button>
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Đăng ký" disabled={disableTab2}>
                        <div>
                            <form onSubmit={checkDataInputs} className={cx('register-form')}>
                                <h2 className={cx('info1')}> THÔNG TIN ĐĂNG KÝ </h2> <br />
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        disabled
                                        value={'0' + phoneNumber.slice(2, 12)}
                                        className={cx('inputRegisterSDT')}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    <p className={cx('errorMessNewPW')}>{errorMessNewUser1}</p>
                                    <input
                                        type={passwordType1}
                                        placeholder="Nhập mật khẩu"
                                        // pattern="^[a-zA-Z0-9 ]{5,}$"
                                        className={cx('inputRegisterPass')}
                                        onChange={(e) => {
                                            setPasswordInputNewPW(e.target.value);
                                        }}
                                        value={passwordInputNewPW}
                                        name="password"
                                    />
                                    <span className="eye1">
                                        <div className="btn btn-outline-primary" onClick={togglePassword1}>
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
                                    <p className={cx('errorMessNewPW')}>{errorMessNewUser2}</p>
                                    <input
                                        type={passwordType2}
                                        placeholder="Nhập lại mật khẩu"
                                        className={cx('inputRegisterPass')}
                                        onChange={(e) => {
                                            setPasswordInputConfirmNewPW(e.target.value);
                                        }}
                                        value={passwordInputConfirmNewPW}
                                        name="password"
                                    />
                                    <span className="eye2">
                                        <div className="btn btn-outline-primary" onClick={togglePassword2}>
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
                                    <p className={cx('errorMessNewPW')}>{errorMessNewUser3}</p>
                                    <input
                                        type="text"
                                        placeholder="Nhập họ và tên"
                                        className={cx('inputRegister')}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <p className={cx('errorMessNewPW')}>{errorMessNewUser4}</p>

                                    <label className={cx('marginbutton')}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bạn đã có tài khoản?
                                    </label>
                                    <Link to="/login" className={cx('login-link')}>
                                        <label>&nbsp;&nbsp;Đăng nhập ngay!</label>
                                    </Link>
                                </div>
                                {isLoading ? (
                                    <p>Đang tạo tài khoản, vui lòng chờ trong giây lát</p>
                                ) : (
                                    <button type="submit" className={cx('btnRegister')}>
                                        {' '}
                                        ĐĂNG KÝ
                                    </button>
                                )}
                            </form>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
}

export default Register;
