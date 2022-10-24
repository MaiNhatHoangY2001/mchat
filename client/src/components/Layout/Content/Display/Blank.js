import classNames from 'classnames/bind';
import styles from './Blank.module.scss';

const cx = classNames.bind(styles);

function Blank() {
    return (
        <div className={cx('main-blank')}>
            <img
                className={cx('robot')}
                src={`https://res.cloudinary.com/dpux6zwj3/image/upload/v1666515256/samples/Icon/robot_yzutpc.gif`}
                alt={'robot'}
            />
            <div className={cx('welcome')}>
                <h1>Chào mừng bạn đến với</h1>
                <h1 className={cx('logo')}>MLine</h1>
            </div>
        </div>
    );
}

export default Blank;
