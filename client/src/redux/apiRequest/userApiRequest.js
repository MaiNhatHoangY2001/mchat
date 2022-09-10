import {
    deleteUsersFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
} from './userSlice';



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
