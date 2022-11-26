import classNames from 'classnames/bind';
import React, { useContext, useState } from 'react';
import Data from './Data';
import styles from './Navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../../redux/apiRequest/authApiRequest';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../../../redux/createInstance';
import { loginSuccess, logoutSuccess } from '../../../../redux/authSlice';
import {
    Avatar,
    Badge,
    Button,
    FormControl,
    // FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    // InputLabel,
    // MenuItem,
    Modal,
    // Radio,
    // RadioGroup,
    // Select,
    // SelectChangeEvent,
    styled,
    TextField,
    Tooltip,
} from '@mui/material';
import { UserContext } from '../../../../context/UserContext';
import EditIcon from '@mui/icons-material/Edit';
import { updateUser } from '../../../../redux/apiRequest/userApiRequest';
import { uploadFile } from '../../../../redux/apiRequest/fileApiRequest';

const cx = classNames.bind(styles);

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 26,
    height: 26,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export default function Navbar({ setContainer }) {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const [select, setSelect] = useState(0);
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState(currentUser?.profileName);
    const [urlImage, setUrlImage] = useState(currentUser?.profileImg);
    const [image, setImage] = useState({});
    // const [years, setYears] = useState(+data.birthDay.split('/')[2]);
    // const [months, setMonths] = useState(+data.birthDay.split('/')[1]);
    // const [days, setDays] = useState(+data.birthDay.split('/')[0]);

    const userContext = useContext(UserContext);
    const removeUserActive2Socket = userContext.removeUserActive2Socket;

    const userId = currentUser?._id;
    const accessToken = currentUser?.accessToken;

    // const today = new Date();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let axiosJWTLogout = createAxios(currentUser, dispatch, logoutSuccess);
    let axiosJWTLogin = createAxios(currentUser, dispatch, loginSuccess);

    // // create number in Array
    // const range = (start, end) => {
    //     return Array(end - start + 1)
    //         .fill()
    //         .map((_, idx) => start + idx);
    // };

    const handleLogout = () => {
        removeUserActive2Socket(currentUser?.phoneNumber);
        localStorage.setItem("phones", JSON.stringify([]));
        logOut(dispatch, navigate, userId, accessToken, axiosJWTLogout);
    };
    const handleCloseModal = () => {
        setOpen(false);
        setInputName(currentUser?.profileName);
    };
    const handleOpenModal = () => setOpen(true);
    const handleInputName = (event) => {
        setInputName(event.target.value);
    };
    const handleChangeImageGroup = (event) => {
        if (event.target.files && event.target.files[0]) {
            setUrlImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    // const handleChangeYears = (event) => {
    //     setYears(event.target.value);
    // };
    // const handleChangeMonths = (event) => {
    //     setMonths(event.target.value);
    // };
    // const handleChangeDays = (event) => {
    //     setDays(event.target.value);
    // };

    const handleClickApply = async () => {
        if (currentUser?.profileName !== inputName.trim()) {
            const apiSetProfileName = {
                profileName: inputName.trim(),
            };

            const currentLogin = { ...currentUser, profileName: inputName.trim() };

            await updateUser(accessToken, dispatch, currentUser._id, apiSetProfileName, axiosJWTLogin);
            dispatch(loginSuccess(currentLogin));
        }

        if (currentUser?.profileImg !== urlImage) {
            //upload image to cloud
            const bodyFormData = new FormData();
            bodyFormData.append('file', image);
            const uploadImage = await uploadFile(accessToken, dispatch, axiosJWTLogin, bodyFormData);

            window.setTimeout(async function () {
                //set group chat profile img
                const apiSetGroupProfileImg = {
                    profileImg: uploadImage.url[0],
                };

                setUrlImage(uploadImage.url[0]);
                const currentLogin = { ...currentUser, profileImg: uploadImage.url[0] };


                await updateUser(
                    accessToken,
                    dispatch,
                    currentUser._id,
                    apiSetGroupProfileImg,
                    axiosJWTLogin,
                );
                dispatch(loginSuccess(currentLogin));
            }, 1000);
        }

    };

    return (
        <div className={cx('container')}>
            <div className={cx('avata')}>
                <Tooltip title={currentUser?.profileName} onClick={handleOpenModal} placement="right" disableInteractive arrow>
                    <div className={cx('contain-avata')}>
                        <img className={cx('image-avata')} src={currentUser?.profileImg} alt={'avata'} />
                    </div>
                </Tooltip>
            </div>
            <ul className={cx('list-button')}>
                {Data.map((item, index) => {
                    const background = select === index ? item.backgroundSelect : item.background;
                    const image = select === index ? item.urcSelect : item.urc;
                    const toolTip = item.toolTip;

                    return (
                        <Tooltip key={index} title={toolTip} placement="right" disableInteractive arrow>
                            <li
                                className={cx(background)}
                                onClick={() => {
                                    setSelect(index);
                                    setContainer(index);
                                    if (index === 3) handleLogout();
                                }}
                            >
                                <img className={cx('iconButon')} src={image} alt={'icon-message'} />
                            </li>
                        </Tooltip>
                    );
                })}
            </ul>

            <Modal open={open} onClose={handleCloseModal}>
                <Grid container width={500} borderRadius={2} direction="column" className={cx('modalMainProfile')}>
                    <Grid container padding={1} borderBottom={2} borderColor={'#c4c4c4'}>
                        <span className={cx('title')}>Thông tin các nhân</span>
                    </Grid>
                    <Grid container padding={4}>
                        <Grid container justifyContent="center" marginBottom={4}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <Tooltip title="Cập nhật ảnh đại diện" placement="right" arrow>
                                        <SmallAvatar className={cx('buttonEdit')} alt="Remy Sharp">
                                            <IconButton size="small" component="label" variant="contained">
                                                <EditIcon sx={{ fontSize: 16 }} />
                                                <input
                                                    hidden
                                                    onChange={handleChangeImageGroup}
                                                    accept="image/*"
                                                    type="file"
                                                />
                                            </IconButton>
                                        </SmallAvatar>
                                    </Tooltip>
                                }
                            >
                                <Avatar sx={{ width: 80, height: 80 }} alt="Avata" src={urlImage} />
                            </Badge>
                        </Grid>
                        <Grid container direction={'column'} padding={1}>
                            <FormControl>
                                <FormLabel>Số điện thoại</FormLabel>
                                <TextField size="small" value={currentUser?.phoneNumber} disabled />
                            </FormControl>
                        </Grid>
                        <Grid container direction={'column'} padding={1}>
                            <FormControl>
                                <FormLabel>Tên người dùng</FormLabel>
                                <TextField
                                    size="small"
                                    value={inputName}
                                    onChange={handleInputName}
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                        {/* <Grid container direction={'column'} padding={1}>
                            <FormControl>
                                <FormLabel>Giới tính</FormLabel>
                                <RadioGroup row defaultValue={data.gender ? 'female' : 'male'}>
                                    <FormControlLabel value="female" control={<Radio size="small" />} label="Nam" />
                                    <FormControlLabel value="male" control={<Radio size="small" />} label="Nữ" />
                                </RadioGroup>
                            </FormControl>
                        </Grid> */}
                        {/* <Grid container direction={'column'} padding={1}>
                            <FormControl>
                                <FormLabel>Ngày sinh</FormLabel>
                                <Grid container>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel>Ngày</InputLabel>
                                        <Select
                                            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                                            value={days}
                                            label="Ngày"
                                            onChange={handleChangeDays}
                                        >
                                            {range(1, new Date(years, months, 0).getDate()).map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel>Tháng</InputLabel>
                                        <Select
                                            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                                            value={months}
                                            label="Tháng"
                                            onChange={handleChangeMonths}
                                        >
                                            {range(1, 12).map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel>Năm</InputLabel>
                                        <Select
                                            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                                            value={years}
                                            label="Năm"
                                            onChange={handleChangeYears}
                                        >
                                            {range(1950, today.getFullYear()).map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </FormControl>
                        </Grid> */}
                    </Grid>
                    <Grid container justifyContent="flex-end" padding={1} borderTop={2} borderColor={'#c4c4c4'}>
                        <Button onClick={handleClickApply}>Xác Nhận</Button>
                        <Button color="error" onClick={handleCloseModal}>
                            Thoát
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}
