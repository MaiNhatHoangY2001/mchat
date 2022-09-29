import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../../redux/apiRequest/authApiRequest';
import { logoutSuccess } from '../../../../redux/authSlice';
import { createAxios } from '../../../../redux/createInstance';
import styles from './Blank.module.scss';

const cx = classNames.bind(styles);

function Blank() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const id = user?._id;
    const accessToken = user?.accessToken;

    let axiosJWTLogout = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = () => {
        logOut(dispatch, navigate, id, accessToken, axiosJWTLogout);
    };

    return (
        <div className={cx('main-blank')}>
            <button className="navbar-logout" onClick={() => handleLogout()}>
                {' '}
                Log out
            </button>
            <h1 className={cx('h1')}>Welcome to Line</h1>
        </div>
    );
}

export default Blank;
