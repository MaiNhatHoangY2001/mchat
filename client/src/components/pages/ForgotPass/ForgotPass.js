import styles from './ForgotPass.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function ForgotPass() {
    return <h1 className={cx('red-line')}>ForgotPass</h1>;
}

export default ForgotPass;