import styles from './LeftBar.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import AutoComplete from './AutoComplete';
import TextField from '@mui/material/TextField';

const cx = classNames.bind(styles);

function LeftBar() {
    const [usersSearch, setUsersSearch] = useState([]);
    const [textSearchUser, setTextSearchUser] = useState('');

    useEffect(() => {
        fetch(
            'https://real-time-chat-server-123.herokuapp.com/api/user/search?term=' +
                (textSearchUser === '' ? '@' : textSearchUser),
        )
            .then((response) => response.json())
            .then((data) => setUsersSearch(data));
    }, [textSearchUser]);

    return (
        <div className={cx('flex-column', 'container-left')}>
            <div className={cx('flex-column', 'avata-search')}>
                <div className={cx('avata')}>
                    <img
                        src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`}
                        alt={'avata'}
                    ></img>
                </div>
                
                <div className={cx('flex-row', 'input-search')}>
                    <button className={cx('btn')}>
                        <img className={cx('btn-img')}
                            src="https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/list.png" 
                            alt="menu" />
                    </button>
                    <div className={cx('search')}>
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
                </div>
            </div>

            <div className={cx('flex-column', 'scroller-column', 'list-item')}>
                <div className={cx('flex-row', 'item')}>
                    <img 
                        src={`https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png`} 
                        alt={'avata'} />
                    <div className={cx('flex-column', 'content-item')}>
                        <p>Mai Ngoc Long</p>
                        <span>Nothing</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;
