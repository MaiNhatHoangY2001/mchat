import styles from './ButtonFile.scss';
import classNames from 'classnames';
const cx = classNames.bind(styles);
function ButtonFile() {
    return (
        <div className={cx('flex-column', 'scroller-column', 'list-item')}>
            <div className={cx('item2')}>
                <h1>hi</h1>
            </div>
            <div className={cx('flex-row', 'item')}>
                <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                <div className={cx('flex-column', 'content-item')}>
                    <p>Mai Ngoc Long</p>
                    <span>Nothing</span>
                </div>
            </div>
            
            
        </div>
    );
}

export default ButtonFile;
