import {
    addIndividualChatFailed,
    addIndividualChatStart,
    addIndividualChatSuccess,
    addMessageFailed,
    addMessageStart,
    addMessageSuccess,
    getIndividualChatFailed,
    getIndividualChatStart,
    getIndividualChatSuccess,
    getMessagesFailed,
    getMessagesStart,
    getMessagesSuccess,
} from '../chatSlice';

export const addIndividualChat = async (accessToken, dispatch, axiosJWT) => {
    dispatch(addIndividualChatStart());
    try {
        await axiosJWT.post('https://real-time-chat-server-123.herokuapp.com/api/individualChat/', {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(addIndividualChatSuccess());
    } catch (error) {
        dispatch(addIndividualChatFailed());
    }
};

export const addGroupChat = async (accessToken, dispatch, idIndividualChat, axiosJWT) => {
    dispatch(addIndividualChatStart());
    try {
        await axiosJWT.post('https://real-time-chat-server-123.herokuapp.com/api/groupChat/', {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(addIndividualChatSuccess());
    } catch (error) {
        dispatch(addIndividualChatFailed());
    }
};

export const addMessage = async (message, accessToken, dispatch, axiosJWT, newChat) => {
    dispatch(addMessageStart());
    try {
        let msg = message;
        if (newChat) {
            const newIndiChat = await axiosJWT.post(
                'https://real-time-chat-server-123.herokuapp.com/api/individualChat/',
                {
                    headers: { token: `Bearer ${accessToken}` },
                },
            );
            msg = {
                ...message,
                individualChat: newIndiChat._id,
            };
        }
        const mess = await axiosJWT.post('https://real-time-chat-server-123.herokuapp.com/api/message/', msg, {
            headers: { token: `Bearer ${accessToken}` },
        });

        dispatch(addMessageSuccess(mess.data));
    } catch (error) {
        dispatch(addMessageFailed());
    }
};
export const getMsgs = async (accessToken, dispatch, sender, axiosJWT) => {
    dispatch(getMessagesStart());
    try {
        const res = await axiosJWT.get('https://real-time-chat-server-123.herokuapp.com/api/individualChat/', {
            headers: { token: `Bearer ${accessToken}` },
            params: sender,
        });
        dispatch(getMessagesSuccess(res.data));
    } catch (error) {
        dispatch(getMessagesFailed());
    }
};

export const getIndividualChat = async (accessToken, userId, dispatch, axiosJWT) => {
    dispatch(getIndividualChatStart());
    try {
        const res = await axiosJWT.get('https://real-time-chat-server-123.herokuapp.com/api/individualChat/' + userId, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getIndividualChatSuccess(res.data));
    } catch (error) {
        dispatch(getIndividualChatFailed());
    }
};
