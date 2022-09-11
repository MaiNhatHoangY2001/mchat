import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from '../../../redux/apiRequest/authApiRequest';
import { useDispatch, useSelector } from 'react-redux';

import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

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

        const link1 = document.createElement("link");
        link1.src = "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
        link1.async = "true";
        document.body.appendChild(link1);

        const script1 = document.createElement("script"),
              script2 = document.createElement("script"),
              script3 = document.createElement("script");

        script1.src = "https://code.jquery.com/jquery-3.4.1.slim.min.js";
        script1.async = true;
        script2.src = "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js";
        script2.async = true;
        script3.src = "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js";
        script3.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);
        document.body.appendChild(script3);
    })

    const a = styled.a`
    &:hover {
        color: #D57AD4;
        cursor: pointer;
        text-decoration: underline;
    }`;

    return (
        // <section className={cx('login-container')}>
             
        //     <div className={cx('login-title')}> Log in</div>
        //     <form onSubmit={handleLogin}>
        //         <label>USERNAME</label>
        //         <input
        //             type="text"
        //             placeholder="Enter your username"
        //             onChange={(e) => {
        //                 setUserName(e.target.value);
        //             }}
        //         />
        //         <label>PASSWORD</label>
        //         <input
        //             type="password"
        //             placeholder="Enter your password"
        //             onChange={(e) => {
        //                 setPassword(e.target.value);
        //             }}
        //         />
        //         {isLoading ? <p>currently loading</p> : <button type="submit"> Continue </button>}
                
        //     </form>
        //     <div className={cx('login-register')}> Don't have an account yet? </div>
        //     <Link className={cx('login-register-link')} to="/register">
        //         Register one for free{' '}
        //     </Link>
        // </section>
        <div className='table'>
            <div className='row'>
                <div className={cx('col col-left')} 
                     style={{ backgroundImage: "url('https://data-mline-congnghemoi.s3.ap-southeast-1.amazonaws.com/bgcolor.png')",
                              backgroundSize: "cover",
                              height: "100vh"}}>
                    <div className={cx('box-left')}>
                        <img src={'https://data-mline-congnghemoi.s3.ap-southeast-1.amazonaws.com/logo-no-bg.png'} alt={"logo=MLine"}/>
                        <span id={cx("line")}><b>LINE</b></span>
                    </div>
                </div>

                <div className={cx('col col-right')}
                     style={{border: "1px solid black"}}>
                    <div className={cx("row-top")}
                         style={{marginTop: "10%"}}>
                        <h1>THÔNG TIN NHẬP</h1>
                        <form onSubmit={handleLogin}>
                        <div className={cx("rowTenTK")}>
                            <span>Tên tài khoản:</span>
                            <input type="text" placeholder="Nhập tên tài khoản" className={cx("inputUser")} 
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                    }}
                            />
                        </div>
                        <div className={cx("rowMK")}>
                            <span>Mật khẩu:</span>
                            <input type="password" placeholder="Nhập mật khẩu" className={cx("inputPW")} 
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                            />
                        </div>
                        </form>
                        <div className={cx("rowQuenMK")}>
                            <a href="../ForgotPass/ForgotPass"><b>Quên mật khẩu?</b></a>
                        </div>
                        <div className={cx("rowBtnDN")}>
                            {isLoading ? <p>currently loading</p> : <button type="submit"><b>ĐĂNG NHẬP</b></button>}
                        </div>
                        <div className={cx("rowChuaCoTK")}><span>Bạn chưa có tài khoản?</span></div>
                        <div className={cx("rowDKNgay")}>
                            <a href="../Register/Register" className={cx("labelDKNgay")}><b>Đăng ký ngay</b></a>
                        </div>
                    </div>
                    <div className={cx("row-bottom")}>
                        <div className={cx("w3-bar")}>
                            <div className={cx("row")}>
                                <a href="../Register/Register" className={cx("w3-bar-item","w3-button","btnDK")}><b>ĐĂNG KÝ</b></a>
                                <a href="" className={cx("w3-bar-item","w3-button","btnDN","active-tab")}><b>ĐĂNG NHẬP</b></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
