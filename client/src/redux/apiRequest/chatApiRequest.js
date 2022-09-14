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

import { url } from './authApiRequest';

export const addIndividualChat4NewUser = async (
    accessToken,
    msg,
    individualChatUser,
    individualChatSender,
    dispatch,
    axiosJWT,
) => {
    dispatch(addIndividualChatStart());
    try {
        const res = await axiosJWT.post(`${url}/api/individualChat/`, individualChatUser, {
            headers: { token: `Bearer ${accessToken}` },
        });
        await axiosJWT.post(`${url}/api/individualChat/`, individualChatSender, {
            headers: { token: `Bearer ${accessToken}` },
        });

        //ADD MESSAGE
        const message = {
            ...msg,
            individualChat: res.data._id,
        };

        addMessage(message, accessToken, dispatch, axiosJWT);

        dispatch(addIndividualChatSuccess(res.data._id));
    } catch (error) {
        dispatch(addIndividualChatFailed());
    }
};

export const addGroupChat = async (accessToken, dispatch, idIndividualChat, axiosJWT) => {
    dispatch(addIndividualChatStart());
    try {
        await axiosJWT.post(`${url}/api/groupChat/`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(addIndividualChatSuccess());
    } catch (error) {
        dispatch(addIndividualChatFailed());
    }
};

export const addMessage = async (message, accessToken, dispatch, axiosJWT) => {
    dispatch(addMessageStart());
    try {
        const mess = await axiosJWT.post(`${url}/api/message/`, message, {
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
        const res = await axiosJWT.get(`${url}/api/individualChat`, {
            headers: { token: `Bearer ${accessToken}` },
            params: sender,
        });
        dispatch(getMessagesSuccess(res.data));
    } catch (error) {
        dispatch(getMessagesFailed());
    }
};

export const getListIndividualChat = async (accessToken, userId, dispatch, axiosJWT) => {
    dispatch(getIndividualChatStart());
    try {
        const res = await axiosJWT.get(`${url}/api/individualChat/` + userId, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getIndividualChatSuccess(res.data));
    } catch (error) {
        dispatch(getIndividualChatFailed());
    }
};

export const getIndividualChat = async (accessToken, actor, dispatch, axiosJWT) => {
    dispatch(addIndividualChatSuccess());
    try {
        const res = await axiosJWT.get(`${url}/api/individualChat/a/chat`, {
            headers: { token: `Bearer ${accessToken}` },
            params: actor,
        });
        dispatch(addIndividualChatSuccess(res.data[0]._id));
    } catch (error) {
        dispatch(addIndividualChatSuccess());
    }
};
