import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/apiRequest/authApiRequest';
//import { DatePicker } from 'react-datepicker'
//import {Formik, useFormik} from 'formik'
const cx = classNames.bind(styles);

function Register() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const [input, setInput] = useState({
        userName: '',
        
    })
    const [error, setError] = useState({
        userName: '',
    })
    const onInputChange = e =>{
        const {userName} = e.target;
//u        setInput(preventDefault => ({...preventDefault, [userName]: value}))
    }
//    const [isOpen, setIsOpen] = useState(false);
    // bỏ username - email, gộp họ và tên, số dt đưa lên đầu
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

    const handleRegister = (e) => {
        e.preventDefault();
        // const validationForm = this.validationForm();
        // if(validationForm.error){
        //     alert(validationForm.msg);
        // }
        const newUser = {
            password: password,
            firstName: firstName,
            lastName: lastName,
            profileName: firstName + ' ' + lastName,
            date: date,
            phoneNumber: phoneNumber,
            refreshToken: '',
            profileImg: '',
        };
        registerUser(newUser, dispatch, navigate, setIsLoading);
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    });


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
                                type="date" 
                                placeholder="dd/mm/yyyy" 
  //                              className={cx('input-register')}
                                onChange={(e) => setDate(e.target.value)}/>
                            <br/>
                        {/* </div> */}

                        {/* <div className={cx('row-register')}> */}
                            <label className={cx('margininput')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email:</label>
                            <input 
                                type="email" 
                                placeholder="nhom6@congnghemoi.IT" 
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
                                <label>&nbsp;&nbsp;&nbsp;Đăng nhập ngay!</label>
                            </Link>
                        {/* </div> */}
                    </div>     
                            {isLoading ? <p>Đang tạo tài khoản, vui lòng chờ trong giây lát</p> :  <button type="submit" className={cx('btnRegister')}> ĐĂNG KÝ</button>}
                      
                </form>
            </section>
    );
}

export default Register;
