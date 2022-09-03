import styles from './Signup.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function Signup() {
    return <h1 className={cx('red-line')}>Signup</h1>;
}

export default Signup;