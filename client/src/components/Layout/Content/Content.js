import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { RightBar } from '../../Layout';
import Chat from './Display/Chat';
import { useSelector } from 'react-redux';
import Blank from './Display/Blank';

const cx = classNames.bind(styles);

function Content() {
    const sender = useSelector((state) => state.user.sender?.user);
    return (
        <div className={cx('flex-row', 'container-center')}>
            <div className={cx('flex-column', 'fix-height-screen', 'main-center')}>
                {sender !== null ? <Chat /> : <Blank />}
            </div>

            <RightBar />

            {/*           
            <ul id="messengers"></ul> */}
            {/* <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />

            </form> */}
            {/* <p>{sender?.userName}</p> */}
        </div>
    );
}

export default Content;
