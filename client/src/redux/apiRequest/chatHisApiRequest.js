import { addChatHistoryFailed, addChatHistoryStart, addChatHistorySuccess } from "../chatSlice";

export const addHistoryChat = async (accessToken, dispatch, idSentUser, axiosJWT) => {
    dispatch(addChatHistoryStart());
    try {
        const chatHis = await axiosJWT.put('https://real-time-chat-server-123.herokuapp.com/api/historyChat/', {
            headers: { token: `Bearer ${accessToken}` },
        });

        dispatch(addChatHistorySuccess(chatHis.data));
    } catch (error) {
        dispatch(addChatHistoryFailed());
    }
};