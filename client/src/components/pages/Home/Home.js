import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { Content, LeftBar, RightBar } from '../../Layout';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("main")}>
            <LeftBar />
            <Content />
            <RightBar />
        </div>
    );
}

export default Home;
