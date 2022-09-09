import axios from 'axios';
import jwtDecode from 'jwt-decode';

const refreshToken = async () => {
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post('https://real-time-chat-server-123.herokuapp.com/api/refresh', {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};
