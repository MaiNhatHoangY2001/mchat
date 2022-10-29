import { Button, IconButton, Modal } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './ModalKey.scss';
import KeyIcon from '@mui/icons-material/Key';

const cx = classNames.bind(styles);

export default function ModalKey({ content, onPress }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton onClick={handleOpen}>
                <KeyIcon />
            </IconButton>
            <Modal hideBackdrop open={open} onClose={handleClose}>
                <div className={cx('modalDialog')}>
                    <div className={cx('modalTitle')}>
                        <p>Xác nhận</p>
                    </div>
                    <div className={cx('modalContent')}>
                        <p>{content}</p>
                    </div>
                    <div className={cx('modalButton')}>
                        <Button size="small" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button size="small" onClick={onPress}>
                            Đồng ý
                        </Button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
}
