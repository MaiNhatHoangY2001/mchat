import { Button, IconButton, Modal } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ModalRemoveUser.scss';
import React, { useState } from 'react';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

const cx = classNames.bind(styles);

export default function ModalRemoveUser({ content, onPress }) {
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
                <GroupRemoveIcon />
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
                        <Button
                            size="small"
                            onClick={() => {
                                onPress();
                                handleClose();
                            }}
                        >
                            Đồng ý
                        </Button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
}
