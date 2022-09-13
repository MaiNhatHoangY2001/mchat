import axios from 'axios';

import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from '../authSlice';
import { clearActor } from '../chatSlice';
import { clearSender } from '../userSlice';

export const url =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8000'
        : 'https://real-time-chat-server-123.herokuapp.com';

export const loginUser = async (user, dispatch, navigate, setIsLoading) => {
    dispatch(loginStart());
    try {
        setIsLoading(true);
        const res = await axios.post(`${url}/api/login`, user, {
            withCredentials: true,
        });
        dispatch(loginSuccess(res.data));
        setIsLoading(false);
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
        setIsLoading(false);
    }
};

export const registerUser = async (user, dispatch, navigate, setIsLoading) => {
    dispatch(registerStart());
    try {
        setIsLoading(true);
        await axios.post(`${url}/api/register`, user);
        dispatch(registerSuccess());
        setIsLoading(false);
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed());
        setIsLoading(false);
    }
};

export const logOut = async (dispatch, navigate, id, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(`${url}/api/logout`, id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());
        dispatch(clearSender());
        dispatch(clearActor());
        navigate('/login');
    } catch (error) {
        dispatch(logoutFailed());
    }
};
