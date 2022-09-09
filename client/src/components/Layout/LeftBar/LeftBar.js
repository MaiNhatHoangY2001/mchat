import styles from './LeftBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LeftBar() {
    return (
        <div className={cx('container-left')}>
            <img className={cx('avata')} src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"} ></img>
            <div className={cx('input-search')}>
                <button className={cx('btn')}>btn</button>
                <input className={cx('search')} type="text" placeholder="Search" />
            </div>

            <hr />
            <div className={cx('list-item')}>

                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={"avata"}/>
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LeftBar;
