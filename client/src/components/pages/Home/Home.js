import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { Content, LeftBar, RightBar } from '../../Layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../../redux/createInstance';
import { getIndividualChatSuccess } from '../../../redux/chatSlice';
import { getIndividualChat } from '../../../redux/apiRequest/chatApiRequest';

const cx = classNames.bind(styles);

function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWTChats = createAxios(currentUser, dispatch, getIndividualChatSuccess);

    const accessToken = currentUser?.accessToken;
    const id = currentUser?._id;

    useEffect(() => {
        getIndividualChat(accessToken, id, dispatch, axiosJWTChats);
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    return (
        <main className={cx('flex-row')}>
            <LeftBar />
            <Content />
        </main>
    );
}

export default Home;
