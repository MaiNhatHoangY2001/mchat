import styles from './ForgotPass.module.scss';
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';

import 'w3-css/w3.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);


function ForgotPass() {
    return (
        <div className={cx('bodyForgotPW')}>
            <section className={cx('forgotpw-container')}>
                <div className='row'>
                    <div className={cx('logo')}>
                        <img src={'https://data-mline-congnghemoi.s3.ap-southeast-1.amazonaws.com/logo-no-bg.png'} alt={"logo=MLine"} />
                        <span id={cx("line")}>LINE</span>
                    </div>
                </div>
                <div className={cx('login-title')}>Khôi phục mật khẩu MLine</div>
                {/* <form onSubmit={handleLogin}> */}
                <form className={cx('formForgotPW')}>
                    <div className='col-lg-8'>
                        <label className={cx('lblTkForgotPW')}>Tài khoản:</label><br/>
                        <input
                            className={cx('txtTkForgotPW')}
                            type="text"
                            placeholder="Nhập tên tài khoản"
                            // onChange={(e) => {
                            //     setUserName(e.target.value);
                            // }}
                        />
                        <label className={cx('lblMKMoi')}>Mật khẩu mới:</label>
                        <input
                            className={cx('txtNewPW')}
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            // onChange={(e) => {
                            //     setPassword(e.target.value);
                            // }}
                        />
                        <label className={cx('lblXacNhanMK')}>Xác nhận mật khẩu:</label>
                        <input
                            className={cx('txtConfirmNewPW')}
                            type='password'
                            placeholder='Nhập lại mật khẩu mới'
                        />
                        {/* <Link className={cx('forgotpw-link')} to="/forgotpass">
                            Bạn quên mật khẩu?{' '}
                        </Link> */}
                    </div>
                    {/* {isLoading ? <p><i>Đang đăng nhập...</i></p> : */} <button className={cx('btnNewPW')} type="submit">LẤY LẠI MẬT KHẨU</button>
                    <Link className={cx('comback-login')} to="/login">
                        ◀ Quay lại{' '}
                    </Link>
                </form>
            </section>
        </div>
    );
}

export default ForgotPass;