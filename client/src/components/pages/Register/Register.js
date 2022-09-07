import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/apiRequest';

const cx = classNames.bind(styles);

function Register() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            userName: userName,
            firstName: firstName,
            password: password,
        };
        registerUser(newUser, dispatch, navigate, setIsLoading);
    };

    useEffect(() => {
        if(user){
            navigate("/");
        }
    })

    return (
        <section className={cx('register-container')}>
            <div className={cx('register-title')}> Sign up </div>
            <form onSubmit={handleRegister}>
                <label>FIRST NAME</label>
                <input type="text" placeholder="Enter firstName" onChange={(e) => setFirstName(e.target.value)} />
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" onChange={(e) => setUserName(e.target.value)} />
                <label>PASSWORD</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                 {isLoading ? <p>currently loading</p> :  <button type="submit"> Create account </button>}
               
            </form>
        </section>
    );
}

export default Register;
