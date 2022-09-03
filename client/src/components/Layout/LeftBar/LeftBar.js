import styles from './LeftBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LeftBar() {
    var h1 = <h1 className={cx('red-line')}>LeftBar</h1>
    return h1;
}

export default LeftBar;
