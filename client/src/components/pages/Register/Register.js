import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/apiRequest/authApiRequest';

const cx = classNames.bind(styles);

function Register() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailID, setEmailID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            userName: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            date: date,
            emailID: emailID,
            phoneNumber: phoneNumber,
        };
        registerUser(newUser, dispatch, navigate, setIsLoading);
    };

    useEffect(() => {
        if(user){
            navigate("/");
        }
    })

    return (
        // <body>
            <section className={cx('register-container')}>
                <form onSubmit={handleRegister} className={cx('register-form')}>
                    <h2> THÔNG TIN ĐĂNG KÝ </h2>
                    <div className='col-lg-8'>
                        
                            <label className={cx('margininput')}>Tài khoản:</label>
                            <input type="text" placeholder="Nhập tên tài khoản" 
                               
                                onChange={(e) => setUserName(e.target.value)} />                           
                        

                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>Mật khẩu:</label>  
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                // className={cx('mainput')}
                                onChange={(e) => setPassword(e.target.value)} />
                        {/* </div> */}

                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>Xác nhận:</label> 
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                //className={cx('input-register')}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            <br/>
                        {/* </div> */}

                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Họ:</label> 
                             <input 
                                type="text" 
                                placeholder="Nhập họ" 
 //                               className={cx('input-register')}
                                onChange={(e) => setFirstName(e.target.value)} />
                            <br/>
                        {/* </div> */}

                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tên:</label>
                            <input 
                                type="text" 
                                placeholder="Nhập tên" 
                                // className={cx('input-register')}
                                onChange={(e) => setLastName(e.target.value)}/>
                        {/* </div> */}

                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>Năm sinh:</label>
                            <input 
                                type="text" 
                                placeholder="dd/mm/yyyy" 
  //                              className={cx('input-register')}
                                onChange={(e) => setDate(e.target.value)}/>
                        {/* </div> */}

                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email:</label>
                            <input 
                                type="text" 
                                placeholder="Nhập email" 
                                // className={cx('input-register')}
                                onChange={(e) => setEmailID(e.target.value)}/>   
                        {/* </div> */}
                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SĐT:</label>
                            <input 
                                type="text" 
                                placeholder="Nhập số điện thoại" 
                                // className={cx('input-register')}
                                onChange={(e) => setPhoneNumber(e.target.value)}/>
                        {/* </div>  */}

                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('marginbutton')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bạn đã có tài khoản?</label>      
                            <Link to="/login" className={cx('login-link')}>
                                <label>&nbsp;&nbsp;&nbsp;Đăng nhập ngay</label>
                            </Link>
                        {/* </div> */}
                    </div>     
                            {isLoading ? <p>Đang tạo tài khoản, vui lòng chờ trong giây lát</p> :  <button type="submit"> ĐĂNG KÝ</button>}
                      
                </form>
            </section>
    //    </body> 
    );
}

export default Register;
