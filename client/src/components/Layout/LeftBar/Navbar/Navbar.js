import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Data from './Data';
import styles from './Navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../../redux/apiRequest/authApiRequest';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../../../redux/createInstance';
import { logoutSuccess } from '../../../../redux/authSlice';
import { Tooltip } from '@mui/material';

const cx = classNames.bind(styles);

export default function Navbar({ setContainer }) {
    const [select, setSelect] = useState(0);

    const user = useSelector((state) => state.auth.login?.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let axiosJWTLogout = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = () => {
        logOut(dispatch, navigate, userId, accessToken, axiosJWTLogout);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('avata')}>
                <Tooltip title={user?.profileName} placement="right" disableInteractive arrow>
                    <div className={cx('contain-avata')}>
                        <img
                            className={cx('image-avata')}
                            src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1667672819/Avata/avata01_gqmzyq.png`}
                            alt={'avata'}
                        />
                    </div>
                </Tooltip>
            </div>
            <ul className={cx('list-button')}>
                {Data.map((item, index) => {
                    const background = select === index ? item.backgroundSelect : item.background;
                    const imgae = select === index ? item.urcSelect : item.urc;
                    const toolTip = item.toolTip;

                    return (
                        <Tooltip key={index} title={toolTip} placement="right" disableInteractive arrow>
                            <li
                                className={cx(background)}
                                onClick={() => {
                                    setSelect(index);
                                    setContainer(index);
                                    if (index === 3) handleLogout();
                                }}
                            >
                                <img className={cx('iconButon')} src={imgae} alt={'icon-message'} />
                            </li>
                        </Tooltip>
                    );
                })}
            </ul>
        </div>
    );
}
