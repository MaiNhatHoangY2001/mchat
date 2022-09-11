import { addChatFailed, addChatStart, addChatSuccess } from '../chatSlice';

export const addChat = async (accessToken, dispatch, axiosJWT) => {
    dispatch(addChatStart());
    try {
        const chat = await axiosJWT.put('https://real-time-chat-server-123.herokuapp.com/api/chat/', {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(addChatSuccess(chat.data));
    } catch (error) {
        dispatch(addChatFailed());
    }
};

