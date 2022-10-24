import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import styles from '../Content/Content.module.scss';
const cx = classNames.bind(styles);

function LoadingChat() {
    return (
        <>
            <div className={cx('userSend')}>
                <Skeleton className={cx('imgChat')} circle containerClassName="avatar-skeleton" />
                <div className={cx('boxTextChat')}>
                    <Skeleton className={cx('textChat')} width={350} />
                </div>
            </div>
            <div className={cx('friendSend')}>
                <Skeleton className={cx('imgChat')} circle containerClassName="avatar-skeleton" />
                <div className={cx('boxTextChat')}>
                    <Skeleton className={cx('textChat')} width={350} />
                </div>
            </div>
            <div className={cx('userSend')}>
                <Skeleton className={cx('imgChat')} circle containerClassName="avatar-skeleton" />
                <div className={cx('boxTextChat')}>
                    <Skeleton className={cx('textChat')} width={350} />
                </div>
            </div>
            <div className={cx('friendSend')}>
                <Skeleton className={cx('imgChat')} circle containerClassName="avatar-skeleton" />
                <div className={cx('boxTextChat')}>
                    <Skeleton className={cx('textChat')} width={350} />
                </div>
            </div>
        </>
    );
}

export default LoadingChat;
