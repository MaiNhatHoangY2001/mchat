import styles from './LeftBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LeftBar() {
    return <h1 className={cx('red-line')}>LeftBar</h1>;
}

export default LeftBar;
