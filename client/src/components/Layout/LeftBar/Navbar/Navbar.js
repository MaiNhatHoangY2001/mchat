import classNames from 'classnames/bind';
import { useState } from 'react';
import Data from './Data';
import styles from './Navbar.scss';
import ReactTooltip from 'react-tooltip';

const cx = classNames.bind(styles);

export default function Navbar({ setContainer }) {
    const [select, setSelect] = useState(0);

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
                        <>
                            <li
                                data-tip={toolTip}
                                data-for="background"
                                data-iscapture="true"
                                key={index}
                                className={cx(background)}
                                onClick={() => {
                                    setSelect(index);
                                    setContainer(index);
                                }}
                            >
                                <img className={cx('iconButon')} src={imgae} alt={'icon-message'} />
                            </li>
                            <ReactTooltip id="background" place="right" />
                        </>
                    );
                })}
                ;
            </ul>
        </div>
    );
}
