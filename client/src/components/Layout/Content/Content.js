import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { RightBar } from '../../Layout';
import Chat from './Display/Chat';
import { useSelector } from 'react-redux';
import Blank from './Display/Blank';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Content() {
    const [isRightBar, setRightBar] = useState(true);
    const [isActionClick, setIsActionClick] = useState(true);

    const handleClickSetRightBar = () => {
        setRightBar(!isRightBar);
        setIsActionClick(!isActionClick);
    };

    const handleClickHideRightBar = () => {
        if (isActionClick) {
            setRightBar(false);
            setIsActionClick(false);
        }
    };

    const sender = useSelector((state) => state.user.sender?.user);
    return (
        <div className={cx('flex-row', 'container-center')}>
            <div className={cx('flex-column', 'fix-height-screen', 'main-center')} onClick={handleClickHideRightBar}>
                {sender !== null ? <Chat setRightBar={{ isRightBar, handleClickSetRightBar }} /> : <Blank />}
            </div>
            {isRightBar ? <RightBar isRightBar={isRightBar} /> : ''}
        </div>
    );
}

export default Content;
