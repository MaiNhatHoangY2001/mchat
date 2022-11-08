import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { Content, LeftBar } from '../../Layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../../redux/createInstance';
import { getListGroupChat, getListIndividualChat } from '../../../redux/apiRequest/chatApiRequest';
import { loginSuccess } from '../../../redux/authSlice';

const cx = classNames.bind(styles);

function Home() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

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
    //     const handleTabClose = event => {
    //         event.preventDefault();

    //         console.log('beforeunload event triggered');

    //         return (event.returnValue = 'Are you sure you want to exit?');
    //     };

    //     window.addEventListener('beforeunload', handleTabClose);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleTabClose);
    //     };
    // }, []);

    return (
        <main className={cx('flex-row')}>
            <LeftBar />
            <Content />
        </main>
    );
}

export default Home;
