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
 
export const loginUser = async (user, dispatch, navigate, setIsLoading) => {
    dispatch(loginStart());
    try {
        setIsLoading(true);
        const res = await axios.post('https://real-time-chat-server-123.herokuapp.com/api/login', user, { withCredentials: true });
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
         await axios.post('https://real-time-chat-server-123.herokuapp.com/api/register', user);
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
        await axiosJWT.post('https://real-time-chat-server-123.herokuapp.com/api/logout', id, {
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
        const res = await axiosJWT.get('https://real-time-chat-server-123.herokuapp.com/api/user', {
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
        const res = await axiosJWT.delete('https://real-time-chat-server-123.herokuapp.com/api/user/' + id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUsersSuccess(res.data));
    } catch (error) {
        dispatch(deleteUsersFailed(error.response.data));
    }
};
