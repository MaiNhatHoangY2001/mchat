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
    const sender = useSelector((state) => state.user.sender?.user);
    return <div className={cx('containerCenter')}>{sender !== null ? <Chat /> : <Blank />}</div>;
}

export default Content;
