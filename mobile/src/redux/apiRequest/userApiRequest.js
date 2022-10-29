import axios from 'axios';
import { url } from '../createInstance';
import {
    changePassFailed,
    changePassStart,
    changePassSuccess,
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
        //navigate('/');
    } catch (error) {
        dispatch(changePassFailed());
    }
};
