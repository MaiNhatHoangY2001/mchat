import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('loading-body')}>
            <svg>
                <g>
                    <path d="M 50,100 A 1,1 0 0 1 50,0" />
                </g>
                <g>
                    <path d="M 50,75 A 1,1 0 0 0 50,-25" />
                </g>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className={cx('stop1')} />
                        <stop offset="100%" className={cx('stop2')} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

export default Loading;
