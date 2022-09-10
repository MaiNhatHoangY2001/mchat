import styles from './RightBar.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function RightBar() {
    return (
        <div className={cx('flex-column', 'container-right')}>
            <h1>gey</h1>
        </div>
    );
}

export default RightBar;
