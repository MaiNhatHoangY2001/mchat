import styles from './LeftBar.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import AutoComplete from './AutoComplete';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function LeftBar() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const [usersSearch, setUsersSearch] = useState([]);
    const [textSearchUser, setTextSearchUser] = useState('');

    useEffect(() => {
        fetch(
            'https://real-time-chat-server-123.herokuapp.com/api/user/search?term=' +
                (textSearchUser === '' ? '@' : textSearchUser),
        )
            .then((response) => response.json())
            .then((users) => setUsersSearch(users.filter((user) => user.userName !== currentUser.userName)));
    }, [textSearchUser]);

    return (
        <div className={cx('container-left')}>
            <img
                className={cx('avata')}
                src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                alt={'avata'}
            ></img>
            <div className={cx('input-search')}>
                <button className={cx('btn')}>btn</button>
                <AutoComplete
                    users={usersSearch}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                onChange: (e) => {
                                    setTextSearchUser(e.target.value);
                                },
                            }}
                        />
                    )}
                />
            </div>

            <hr />
            <div className={cx('list-item')}>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
                    <div className={cx('content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} alt={'avata'} />
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
