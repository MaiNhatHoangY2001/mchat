import { Button, Modal } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './ModalOutGroup.scss';

const cx = classNames.bind(styles);

export default function ModalOutGroup({ user, adminGroup, handleShowModalOutGroup, handleOutGroup }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant="text"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={user._id === adminGroup ? handleOpen : handleOutGroup}
            >
                Rời nhóm
            </Button>
            <Modal hideBackdrop open={open} onClose={handleClose}>
                <div className={cx('modalDialogOutGroup')}>
                    <div className={cx('modalTitle')}>
                        <p>Xác nhận</p>
                    </div>
                    <div className={cx('modalContent')}>
                        <p>Bạn hãy chuyển quyền trưởng nhóm cho người khác trong nhóm</p>
                    </div>
                    <div className={cx('modalButton')}>
                        <Button size="small" onClick={handleClose}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
}
