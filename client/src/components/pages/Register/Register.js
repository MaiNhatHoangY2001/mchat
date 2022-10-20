import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../../redux/apiRequest/authApiRequest';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
const cx = classNames.bind(styles);

function Register() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    //    const [isOpen, setIsOpen] = useState(false);
    // bỏ username - email, gộp họ và tên, số dt đưa lên đầun
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    //    const [emailID, setEmailID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRePass] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // const validationForm = this.validationForm();
        // if(validationForm.error){
        //     alert(validationForm.msg);
        // }
        const newUser = {
            phoneNumber: phoneNumber,
            password: password,
            profileName: name,
            date: date,
            refreshToken: '',
            profileImg: '',
        };
        registerUser(newUser, dispatch, navigate, setIsLoading);
        window.setTimeout(function () {
            //login when sign up one second
            handleLogin(phoneNumber, password);
            navigate('/');
        }, 1000);
    };

    const handleLogin = (phoneNumber, password) => {
        const newUser = {
            phoneNumber: phoneNumber,
            password: password,
            // phoneNumber: phoneNumberValue,
            // password: pwValue,
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

    return (
        // <body>
        <section className={cx('register-container')}>
            <form onSubmit={handleRegister} className={cx('register-form')}>
                <h2 className={cx('info')}> THÔNG TIN ĐĂNG KÝ </h2> <br />
                <div className="col-lg-6">
                    {/* <label className={cx('margininput')}>Tài khoản:</label>
                            <input type="text" placeholder="Nhập tên tài khoản" 
                               id="userName" name="userName"
                                onChange={(e) => setUserName(e.target.value)} />                            */}
                    {/* <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SĐT:</label> */}
                    <input
                        type="text"
                        pattern="^(0[0-9]{9}$)"
                        placeholder="Nhập số điện thoại"
                        className={cx('inputRegister')}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    {/* <div className={cx('row-register')}> */}
                    {/* <label className={cx('margininput')}>Mật khẩu:</label>   */}
                    <input
                        type={passwordType1}
                        placeholder="Nhập mật khẩu"
                        pattern="^[a-zA-Z0-9 ]{5,}$"
                        className={cx('inputRegisterPass')}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordInputNewPW(e.target.value);
                        }}
                        value={passwordInputNewPW}
                        name="password"
                    />
                    {/* </div> */}
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
                    {/* <div className={cx('row-register')}> */}
                    {/* <label className={cx('margininput')}>&nbsp;Xác nhận:</label>  */}
                    <input
                        type={passwordType2}
                        placeholder="Nhập lại mật khẩu"
                        className={cx('inputRegisterPass')}
                        onChange={(e) => {
                            setRePass(e.target.value);
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
                    <br />
                    {/* </div> */}

                    {/* <div className={cx('row-register')}> */}
                    {/* <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Họ tên:</label>  */}
                    <input
                        type="text"
                        placeholder="Nhập họ và tên"
                        className={cx('inputRegister')}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* </div> */}

                    {/* <div className={cx('row-register')}> */}
                    {/* <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tên:</label>
                            <input 
                                type="text" 
                                placeholder="Nhập tên" 
                                // className={cx('input-register')}
                                onChange={(e) => setLastName(e.target.value)}/> */}
                    {/* </div> */}

                    {/* <div className={cx('row-register')}> */}
                    {/* <label className={cx('margininput')}>&nbsp;Năm sinh:</label> */}
                    <input
                        type="date"
                        // placeholder="dd/mm/yyyy"
                        className={cx('inputRegisterDate')}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <br />
                    {/* </div> */}

                    {/* <div className={cx('row-register')}> */}
                    {/* <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email:</label>
                            <input 
                                type="email" 
                                placeholder="nhom6@congnghemoi.IT" 
                                // className={cx('input-register')}
                                onChange={(e) => setEmailID(e.target.value)}/>    */}
                    {/* </div> */}
                    {/* <div className={cx('row-register')}> */}

                    {/* </div>  */}
                    <br />
                    {/* <div className={cx('row-register')}> */}
                    <label className={cx('marginbutton')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bạn đã có tài khoản?</label>
                    <Link to="/login" className={cx('login-link')}>
                        <label>&nbsp;&nbsp;Đăng nhập ngay!</label>
                    </Link>
                    {/* </div> */}
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
        </section>
    );
}

export default Register;
