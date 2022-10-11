import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import styles from '../Content/Content.module.scss';
const cx = classNames.bind(styles);

function LoadingChat() {
    return (
        <div className={cx('flex-column')}>
            <div className={cx('flex-row', 'friend-send')}>
                <Skeleton
                    width={40}
                    height={30}
                    className={cx('img-chat')}
                    circle
                    containerClassName="avatar-skeleton"
                />
                <Skeleton className={cx('box-text-chat')} width={350} />
            </div>
            <div className={cx('space-height')}></div>
            <div className={cx('flex-row', 'user-send')}>
                <Skeleton
                    width={40}
                    height={30}
                    className={cx('img-chat')}
                    circle
                    containerClassName="avatar-skeleton"
                />
                <Skeleton className={cx('box-text-chat')} width={350} />
            </div>
            <div className={cx('space-height')}></div>
            <div className={cx('flex-row', 'friend-send')}>
                <Skeleton
                    width={40}
                    height={30}
                    className={cx('img-chat')}
                    circle
                    containerClassName="avatar-skeleton"
                />
                <Skeleton className={cx('box-text-chat')} width={350} />
            </div>
            <div className={cx('space-height')}></div>
            <div className={cx('flex-row', 'user-send')}>
                <Skeleton
                    width={40}
                    height={30}
                    className={cx('img-chat')}
                    circle
                    containerClassName="avatar-skeleton"
                />
                <Skeleton className={cx('box-text-chat')} width={350} />
            </div>
        </div>
    );
}

export default LoadingChat;
