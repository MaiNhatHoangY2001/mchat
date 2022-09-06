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
} from './authSlice';
import {
    deleteUsersFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
} from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('https://realtime-chat-server.onrender.com/api/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
         await axios.post('https://realtime-chat-server.onrender.com/api/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const logOut = async (dispatch, navigate, id, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post('https://realtime-chat-server.onrender.com/api/logout', id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(logoutFailed());
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get('https://realtime-chat-server.onrender.com/api/user', {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailed());
    }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUsersStart());
    try {
        const res = await axiosJWT.delete('https://realtime-chat-server.onrender.com/api/user/' + id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUsersSuccess(res.data));
    } catch (error) {
        dispatch(deleteUsersFailed(error.response.data));
    }
};
