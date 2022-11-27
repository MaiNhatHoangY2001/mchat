import classNames from 'classnames/bind';
import styles from './Styles.scss';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const cx = classNames.bind(styles);

export default function TextInputCustom({ placeholder, onChangeText }) {
    const [showPassword, setShowPassword] = useState(true);
    const [typeInput, setTypeInput] = useState('password');

    const handleShowPW = () => {
        setShowPassword(!showPassword);
        showPassword ? setTypeInput('text') : setTypeInput('password');
    };

    return (
        <div className={cx('contain')}>
            <input
                onChange={(e) => onChangeText(e.target.value)}
                className={cx('text-input')}
                type={typeInput}
                placeholder={placeholder}
            />
            <div className={cx('btn-icon')} onClick={handleShowPW}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
        </div>
    );
}
