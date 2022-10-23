import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { RightBar } from '../../Layout';
import Chat from './Display/Chat';
import { useSelector } from 'react-redux';
import Blank from './Display/Blank';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import React from 'react';

const cx = classNames.bind(styles);

function Content() {
    const [isRightBar, setRightBar] = useState(true);
    const [isSwitch, setSwitch] = useState(true);
    const [isSwitch1, setSwitch1] = useState(false);
    const [isActionClick, setIsActionClick] = useState(true);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(max-width: 1200px)',
    });

    React.useEffect(() => {
        if (!isDesktopOrLaptop) {
            if (isSwitch) {
                setRightBar(true);
            } else {
                setRightBar(false);
            }
            if (isSwitch1) {
                setRightBar(false);
            }
            setSwitch1(false);
        } else {
            if (isSwitch) {
                setRightBar(false);
            }
            if (isSwitch1) {
                setRightBar(true);
                setSwitch(false);
            } else {
                setRightBar(false);
            }
        }
    });

    const handleClickSetRightBar = () => {
        if (!isDesktopOrLaptop) {
            setSwitch(!isSwitch);
        } else {
            setSwitch1(!isSwitch1);
        }
        setIsActionClick(!isActionClick);
    };

    const handleClickHideRightBar = () => {
        if (isActionClick) {
            setIsActionClick(false);
        }
    };

    const sender = useSelector((state) => state.user.sender?.user);
    return (
        <div className={cx('containerCenter')}>
            {sender !== null ? <Chat setRightBar={{ isRightBar, handleClickSetRightBar }} /> : <Blank />}
        </div>
    );
}

export default Content;
