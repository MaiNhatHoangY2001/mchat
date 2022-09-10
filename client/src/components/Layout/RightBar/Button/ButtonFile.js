import styles from './ButtonFile.scss';
import classNames from 'classnames';
const cx = classNames.bind(styles);
function ButtonFile() {
    return (
        <div className={cx('item-file')}></div>
    );
}

export default ButtonFile;