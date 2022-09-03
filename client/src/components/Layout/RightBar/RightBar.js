import styles from './RightBar.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function RightBar() {
    return <h1 className={cx('red-line')}>RightBar</h1>;
}

export default RightBar;
