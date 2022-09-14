import classNames from 'classnames/bind';
import styles from './Blank.module.scss';

const cx = classNames.bind(styles);

function Blank() {
    return (
        <div className={cx('main-blank')}>
            <h1 className={cx('h1')}>Welcome to Line</h1>
        </div>
    );
}

export default Blank;
