import styles from './RightBar.module.scss';
import classNames from 'classnames/bind';
import ButtonFile from './Button/ButtonFile';
import ButtonLink from './Button/ButtonLink';
import ButtonMedia from './Button/ButtonMedia';
import { useState } from 'react';
const cx = classNames.bind(styles);

function RightBar({ isRightBar }) {
    const [layout, setLayout] = useState(0);
    const renderSwitch = () => {
        switch (layout) {
            case 0:
                return <ButtonFile />;

            case 1:
                return <ButtonMedia />;

            case 2:
                return <ButtonLink />;
        }
    };
    return (
        <div
            className={cx('flex-column', '.fix-height-screen', 'main-right')}
            style={{ display: isRightBar ? 'box' : 'none' }}
        >
            <div className={cx('title')}>
                <h2>Thông Tin Cuộc Trò Chuyện</h2>
            </div>

            <div className={cx('flex-row', 'button-right')}>
                <button onClick={() => setLayout(0)} className={cx('btn')}>
                    File
                </button>
                <button onClick={() => setLayout(1)} className={cx('btn')}>
                    Media
                </button>
                <button onClick={() => setLayout(2)} className={cx('btn')}>
                    Link
                </button>
            </div>
            {renderSwitch()}
        </div>
    );
}

export default RightBar;
