import { addIndividualChatFailed, addIndividualChatStart, addIndividualChatSuccess } from "../chatSlice";

export const addIndividualChat = async (accessToken, dispatch, idIndividualChat, axiosJWT) => {
    dispatch(addIndividualChatStart());
    try {
        await axiosJWT.put('https://real-time-chat-server-123.herokuapp.com/api/individualChat/', {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(addIndividualChatSuccess());
    } catch (error) {
        dispatch(addIndividualChatFailed());
    }
};