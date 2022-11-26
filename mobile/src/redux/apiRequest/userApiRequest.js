import axios from 'axios';
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
        navigate('/');
    } catch (error) {
        dispatch(changePassFailed());
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