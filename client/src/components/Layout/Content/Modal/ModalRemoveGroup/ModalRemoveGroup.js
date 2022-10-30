import { Button, Modal } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './ModalRemoveGroup.scss';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

export default function ModalRemoveGroup({ handleClickRemoveGroup }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button color="error" onClick={handleOpen}>
                Giải tán nhóm
            </Button>
            <Modal hideBackdrop open={open} onClose={handleClose}>
                <div className={cx('modalDialogRemoveGroup')}>
                    <div className={cx('modalTitle')}>
                        <p>Xác nhận</p>
                    </div>
                    <div className={cx('modalContent')}>
                        <p>Bạn có chắc muốn xóa nhóm này không?</p>
                    </div>
                    <div className={cx('modalButton')}>
                        <Button size="small" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button
                            size="small"
                            onClick={() => {
                                handleClickRemoveGroup();
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
