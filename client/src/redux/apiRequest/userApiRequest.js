import { url } from '../createInstance';
import { getUsersFailed, getUsersStart, getUsersSuccess } from '../userSlice';

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
