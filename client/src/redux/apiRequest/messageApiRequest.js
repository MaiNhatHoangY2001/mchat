import { addMessageFailed, addMessageStart, addMessageSuccess } from "../chatSlice";


export const addMessage = async (accessToken, dispatch, axiosJWT) => {
    dispatch(addMessageStart());
    try {
        const mess = await axiosJWT.put('https://real-time-chat-server-123.herokuapp.com/api/individualChat/', {
            headers: { token: `Bearer ${accessToken}` },
        });

        dispatch(addMessageSuccess(mess.data));
    } catch (error) {
        dispatch(addMessageFailed());
    }
};
