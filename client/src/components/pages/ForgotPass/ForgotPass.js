import styles from './ForgotPass.module.scss';
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import { useState } from 'react';

import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function ForgotPass() {
    //show-hide-pw
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInputNewPW, setPasswordInputNewPW] = useState("");
    const [passwordInputConfirmNewPW, setPasswordInputConfirmNewPW] = useState("");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <div className={cx('bodyForgotPW')}>
            <section className={cx('forgotpw-container')}>
                    <div className={cx('logo')}>
                        <img src={'https://data-mline-congnghemoi.s3.ap-southeast-1.amazonaws.com/logo-no-bg.png'} alt={"logo=MLine"} />
                        <div id={cx("line")}>LINE</div>
                    </div>
                {/* <form onSubmit={handleLogin}> */}
                <form className={cx('formForgotPW')}>
                    <div className='col-lg-8'>
                        <input
                            className={cx('txtTkForgotPW')}
                            type="text"
                            placeholder="Tên tài khoản"
                            // onChange={(e) => {
                            //     setUserName(e.target.value);
                            // }}
                        />
                        <input
                            className={cx('txtNewPW')}
                            type={passwordType}
                            placeholder="Mật khẩu mới"
                            onChange={(e) => {
                                // setPassword(e.target.value);
                                setPasswordInputNewPW(e.target.value);
                            }}
                            value={passwordInputNewPW}
                            name="password"
                        />
                        <span className="eye1">
                            <div className="btn btn-outline-primary" onClick={togglePassword}>
                                <IconContext.Provider value={{ color: '#D57AD4' }}>
                                    {passwordType === "password" ? <i><FaEyeSlash/></i> : <i><FaEye/></i>}
                                </IconContext.Provider>
                            </div>
                        </span>
                        <input
                            className={cx('txtConfirmNewPW')}
                            type={passwordType}
                            placeholder='Xác nhận mật khẩu mới'
                            onChange={(e) => {
                                setPasswordInputConfirmNewPW(e.target.value);
                            }}
                            value={passwordInputConfirmNewPW}
                            name="password"
                        />
                        <span className="eye2">
                            <div className="btn btn-outline-primary" onClick={togglePassword}>
                                <IconContext.Provider value={{ color: '#D57AD4' }}>
                                    {passwordType === "password" ? <i><FaEyeSlash /></i> : <i><FaEye /></i>}
                                </IconContext.Provider>
                            </div>
                        </span>
                    </div>
                    {/* {isLoading ? <p><i>Đang đăng nhập...</i></p> : */} <button className={cx('btnNewPW')} type="submit">LẤY LẠI MẬT KHẨU</button>
                    <Link className={cx('comback-login')} to="/login">
                        ◀ Quay lại{' '}
                    </Link>
                </form>
            </section>
        </div>
    );
}

export default ForgotPass;