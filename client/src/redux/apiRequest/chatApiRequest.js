import {
    addChatFailed,
    addChatHistoryFailed,
    addChatHistoryStart,
    addChatHistorySuccess,
    addChatStart,
    addChatSuccess,
    addIndividualChatFailed,
    addIndividualChatStart,
    addIndividualChatSuccess,
    addMessageFailed,
    addMessageStart,
    addMessageSuccess,
} from '../chatSlice';

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

export const addIndividualChat = async (accessToken, dispatch, idIndividualChat, axiosJWT) => {
    dispatch(addIndividualChatStart());
    try {
        if (idIndividualChat !== null) {
            await axiosJWT.get(
                'https://real-time-chat-server-123.herokuapp.com/api/individualChat/' + idIndividualChat,
                {
                    headers: { token: `Bearer ${accessToken}` },
                },
            );
        } else {
            await axiosJWT.put('https://real-time-chat-server-123.herokuapp.com/api/individualChat/', {
                headers: { token: `Bearer ${accessToken}` },
            });
        }
        dispatch(addIndividualChatSuccess());
    } catch (error) {
        dispatch(addIndividualChatFailed());
    }
};

export const addHistoryChat = async (accessToken, dispatch, idSentUser, axiosJWT) => {
    let chatHis = {};
    dispatch(addChatHistoryStart());
    try {
        if (idSentUser !== null) {
            chatHis = await axiosJWT.get(
                'https://real-time-chat-server-123.herokuapp.com/api/historyChat/' + idSentUser,
                {
                    headers: { token: `Bearer ${accessToken}` },
                },
            );
        } else {
            chatHis = await axiosJWT.put('https://real-time-chat-server-123.herokuapp.com/api/historyChat/', {
                headers: { token: `Bearer ${accessToken}` },
            });
        }
        dispatch(addChatHistorySuccess(chatHis.data));
    } catch (error) {
        dispatch(addChatHistoryFailed());
    }
};

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
