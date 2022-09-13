import { getUsersFailed, getUsersStart, getUsersSuccess } from '../userSlice';

import {url} from './authApiRequest';

export const searchUser = async (accessToken, dispatch, search, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get(
            `${url}/api/user/search?term=` + search,
            {
                headers: { token: `Bearer ${accessToken}` },
            },
        );
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailed());
    }
};
