import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { Content, LeftBar, RightBar } from '../../Layout';

const cx = classNames.bind(styles);

function Home() {
    return (
        <main className={cx("flex-row")}>
            <LeftBar />
            <Content />
        </main>
    );
}

export default Home;
