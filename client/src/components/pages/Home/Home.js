import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { Content, LeftBar } from '../../Layout';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../../redux/createInstance';
import { getListGroupChat, getListIndividualChat } from '../../../redux/apiRequest/chatApiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import { UserContext } from '../../../context/UserContext';

const cx = classNames.bind(styles);

function Home() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

    const userContext = useContext(UserContext);
    const usersActive = userContext.usersActive;
    const addUserActive2Socket = userContext.addUserActive2Socket;
    const removeUserActive2Socket = userContext.removeUserActive2Socket;

    const accessToken = currentUser?.accessToken;
    const id = currentUser?._id;

    useEffect(() => {
        getListIndividualChat(accessToken, id, dispatch, axiosJWT);
        getListGroupChat(accessToken, id, dispatch, axiosJWT);
    }, []);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser]);

    // useEffect(() => {
    //     addUserActive2Socket(currentUser?.phoneNumber);
    // }, []);

    // useEffect(() => {
    //     window.addEventListener('beforeunload', handleTabClose);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleTabClose);
    //     };
    // }, []);

    // const handleTabClose = (e) => {
    //     var confirmationMessage = '\o/';
    //     removeUserActive2Socket(currentUser.phoneNumber);
    //     return confirmationMessage;
    // };


    return (
        <main className={cx('flex-row')}>
            <LeftBar />
            <Content />
        </main>
    );
}

export default Home;
