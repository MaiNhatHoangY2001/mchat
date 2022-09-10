import styles from './RightBar.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function RightBar() {
    return (
        <div className={cx('flex-column', 'main-right')}>
            <div className={cx('title')}>
                <h2>Thông Tin Cuộc Trò Chuyện</h2>
            </div>

            <div className={cx('flex-row','button-right')}>
                <button className={cx('btn')}>File</button>
                <button className={cx('btn')}>Media</button>
                <button className={cx('btn')}>Link</button>
            </div>
        </div>
    );
}

export default RightBar;
