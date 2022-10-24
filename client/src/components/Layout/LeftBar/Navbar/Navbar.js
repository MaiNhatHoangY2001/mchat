import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Data from './Data';
import styles from './Navbar.scss';
import ReactTooltip from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../../redux/apiRequest/authApiRequest';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../../../redux/createInstance';
import { logoutSuccess } from '../../../../redux/authSlice';

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
                <div className={cx('contain-avata')}>
                    <img
                        data-tip="Mai Ngọc Long"
                        data-for="avata"
                        data-iscapture="true"
                        className={cx('image-avata')}
                        src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                        alt={'avata'}
                    />
                    <ReactTooltip id="avata" place="right" />
                </div>
            </div>
            <ul className={cx('list-button')}>
                {Data.map((item, index) => {
                    const background = select === index ? item.backgroundSelect : item.background;
                    const imgae = select === index ? item.urcSelect : item.urc;
                    const toolTip = item.toolTip;

                    return (
                        <React.Fragment key={index}>
                            <li
                                data-tip={toolTip}
                                data-for="background"
                                data-iscapture="true"
                                className={cx(background)}
                                onClick={() => {
                                    setSelect(index);
                                    setContainer(index);
                                    if (index === 3) handleLogout();
                                }}
                            >
                                <img className={cx('iconButon')} src={imgae} alt={'icon-message'} />
                            </li>
                            <ReactTooltip id="background" place="right" />
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
}