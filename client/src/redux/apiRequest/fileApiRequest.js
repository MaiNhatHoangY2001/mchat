import { url } from '../createInstance';
import { uploadFailed, uploadStart, uploadSuccess } from '../fileSlice';

export const uploadFile = async (accessToken, dispatch, axiosJWT, file) => {
    dispatch(uploadStart());
    try {
        const res = await axiosJWT.post(`${url}/api/files/upload`, file, {
            headers: {
                'content-type': 'multipart/form-data',
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(uploadSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(uploadFailed());
    }
};
