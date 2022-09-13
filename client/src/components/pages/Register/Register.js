import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/apiRequest/authApiRequest';
//import {Formik, useFormik} from 'formik'
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
    const [repass, setRePass] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

//    const reSDT = "^(0[0-9]{9}$)";
    // const xacNhanPass = (e) =>{
    //     const pass = password.toString;
    //     const xnpass = repass.toString;
    //     if(xnpass == pass) 
    //         document.getElementById('spanspass').innerText("V");
    //     else
    //         document.getElementById('spanspass').innerHTML("")
    // }
    const handleRegister = (e) => {
        e.preventDefault();
        // const validationForm = this.validationForm();
        // if(validationForm.error){
        //     alert(validationForm.msg);
        // }
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

    // const validate = values => {
    //     const errors = {};
      
    //     if (!values.firstName) {
    //       errors.firstName = 'Required';
    //     } else if (values.firstName.length > 15) {
    //       errors.firstName = 'Must be 15 characters or less';
    //     }
      
    //     if (!values.lastName) {
    //       errors.lastName = 'Required';
    //     } else if (values.lastName.length > 20) {
    //       errors.lastName = 'Must be 20 characters or less';
    //     }
      
    //     if (!values.email) {
    //       errors.email = 'Required';
    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //       errors.email = 'Invalid email address';
    //     }
      
    //     return errors;
    //   };
    //   const formik = useFormik({
    //     initialValues: {
    //       firstName: '',
    //       lastName: '',
    //       email: '',
    //     },
    //     validate,
    //     onSubmit: values => {
    //       alert(JSON.stringify(values, null, 2));
    //     },
    //   });
    return (
        // <body>
            <section className={cx('register-container')}>
                <form onSubmit={handleRegister} className={cx('register-form')}>
                    <h2> THÔNG TIN ĐĂNG KÝ </h2>
                    <div className='col-lg-6'>
                        
                            <label className={cx('margininput')}>Tài khoản:</label>
                            <input type="text" placeholder="Nhập tên tài khoản" 
                               id="userName" name="userName"
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
                            <label className={cx('margininput')}>&nbsp;Xác nhận:</label> 
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                //className={cx('input-register')}
                                onChange={(e) => setRePass(e.target.value)}
                    //            onBlur={(e) => xacNhanPass(e.target.value)}
                                />
                            <span id="spanspass"></span>
                            <br/>
                        {/* </div> */}

                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Họ:</label> 
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
                            <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email:</label>
                            <input 
                                type="email" 
                                placeholder="Nhập email" 
                                // className={cx('input-register')}
                                onChange={(e) => setEmailID(e.target.value)}/>   
                        {/* </div> */}
                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SĐT:</label>
                            <input 
                                type="text" 
                                placeholder="Nhập số điện thoại" 
                                // className={cx('input-register')}
                                onChange={(e) => setPhoneNumber(e.target.value)}/>
                        {/* </div>  */}
                        <br/> <br/>
                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('marginbutton')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bạn đã có tài khoản?</label>      
                            <Link to="/login" className={cx('login-link')}>
                                <label>&nbsp;&nbsp;&nbsp;Đăng nhập ngay</label>
                            </Link>
                        {/* </div> */}
                    </div>     
                            {isLoading ? <p>Đang tạo tài khoản, vui lòng chờ trong giây lát</p> :  <button type="submit" className={cx('btnRegister')}> ĐĂNG KÝ</button>}
                      
                </form>
            </section>
    //    </body> 
    );
}

export default Register;
