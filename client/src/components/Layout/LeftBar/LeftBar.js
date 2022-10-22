import styles from './LeftBar.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

import Navbar from './Navbar/Navbar';
import ListFriend from './ListFriend/ListFriend';

const cx = classNames.bind(styles);

function LeftBar() {
    const [container, setContainer] = useState(0);

    const ChangeContainer = () => {
        switch (container) {
            case 0:
                return <ListFriend />;
            case 1:
                return <></>;
            case 2:
                return <></>;
            case 3:
                return <></>;
            default:
                return <></>;
        }
    };

    return (
        <div className={cx('flex-row', 'container-left')}>
            <Navbar setContainer={setContainer} />
            {ChangeContainer()}
        </div>
    );
}

export default LeftBar;
