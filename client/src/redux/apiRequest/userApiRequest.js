import axios from 'axios';
import { loginFailed, loginStart, loginSuccess } from '../authSlice';
import { url } from '../createInstance';
import {
    changePassFailed,
    changePassStart,
    changePassSuccess,
    getAllNumberFailed,
    getAllNumberStart,
    getAllNumberSuccess,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
    updateUserFailed,
    updateUserStart,
    updateUserSuccess,
} from '../userSlice';

export const searchUser = async (accessToken, dispatch, search, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get(`${url}/api/user/search?term=` + search, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailed());
    }
};

export const changePassword = async (account, dispatch, navigate) => {
    dispatch(changePassStart());
    try {
        await axios.post(`${url}/api/user/changePassword`, account, {
            withCredentials: true,
        });
        dispatch(changePassSuccess());
        //navigate('/');
    } catch (error) {
        dispatch(changePassFailed());
    }
};

export const updateUser = async (accessToken, dispatch, id, apiUpdate, axiosJWT) => {
    dispatch(updateUserStart());
    try {
        const res = await axiosJWT.put(`${url}/api/user/${id}`, apiUpdate, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(updateUserSuccess());
    } catch (error) {
        dispatch(updateUserFailed());
    }
};


export const getAllNumber = async (dispatch) => {
    dispatch(getAllNumberStart());
    try {
        const res = await axios.get(`${url}/api/user/phones`);
        dispatch(getAllNumberSuccess(res.data));
    } catch (error) {
        dispatch(getAllNumberFailed());
    }
};