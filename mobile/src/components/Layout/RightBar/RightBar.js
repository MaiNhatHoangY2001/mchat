import styles from './RightBar.module.scss';
import classNames from 'classnames/bind';
import ButtonFile from './Button/ButtonFile';
import ButtonLink from './Button/ButtonLink';
import ButtonMedia from './Button/ButtonMedia';
import { useState } from 'react';

const cx = classNames.bind(styles);

function RightBar({ setRightBar }) {
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
        <div className={cx('flex-column', 'main-right')}>
            <div className={cx('bg-auto')} onClick={setRightBar.handleClickSetRightBar}></div>
            <div className={cx('flex-column', '.fix-height-screen', 'list-item')}>
                <div className={cx('title')}>
                    <p>Thông Tin Cuộc Trò Chuyện</p>
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
        </div>
    );
}

export default RightBar;
