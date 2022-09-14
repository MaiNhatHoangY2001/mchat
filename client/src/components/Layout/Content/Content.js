import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { RightBar } from '../../Layout';
import Chat from './Display/Chat';
import { useSelector } from 'react-redux';
import Blank from './Display/Blank';

const cx = classNames.bind(styles);

function Content() {
    const sender = useSelector((state) => state.user.sender?.user);
    return <>{sender !== null ? <Chat /> : <Blank />}</>;
}

export default Content;
