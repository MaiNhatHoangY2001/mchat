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
    updateMessageStart,
    updateMessageSuccess,
} from '../chatSlice';
import { url } from '../createInstance';
import {
    addGroupChatFailed,
    addGroupChatStart,
    addGroupChatSuccess,
    getGroupChatFailed,
    getGroupChatStart,
    getGroupChatSuccess,
    updateGroupChatFailed,
    updateGroupChatStart,
    updateGroupChatSuccess,
} from '../groupChatSlice';

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

export const addGroupChat = async (accessToken, dispatch, groupChat, axiosJWT) => {
    dispatch(addGroupChatStart());
    try {
        const res = await axiosJWT.post(`${url}/api/groupChat/`, groupChat, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(addGroupChatSuccess());
        return res.data;
    } catch (error) {
        dispatch(addGroupChatFailed());
    }
};

export const updateGroupChat = async (accessToken, dispatch, id, apiUpdate, axiosJWT) => {
    dispatch(updateGroupChatStart());
    try {
        await axiosJWT.put(`${url}/api/groupChat/${id}`, apiUpdate, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(updateGroupChatSuccess());
    } catch (error) {
        dispatch(updateGroupChatFailed());
    }
};

export const addUserGroupChat = async (accessToken, dispatch, apiGroupChat, axiosJWT) => {
    dispatch(updateGroupChatStart());
    try {
        await axiosJWT.post(`${url}/api/groupChat/addUser`, apiGroupChat, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(updateGroupChatSuccess());
    } catch (error) {
        dispatch(updateGroupChatFailed());
    }
};

export const removeUserGroupChat = async (accessToken, dispatch, apiGroupChat, axiosJWT) => {
    dispatch(updateGroupChatStart());
    try {
        await axiosJWT.post(`${url}/api/groupChat/removeUser`, apiGroupChat, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(updateGroupChatSuccess());
    } catch (error) {
        dispatch(updateGroupChatFailed());
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

export const getMsgs = async (accessToken, dispatch, actor, axiosJWT) => {
    dispatch(getMessagesStart());
    try {
        const res = await axiosJWT.get(`${url}/api/individualChat`, {
            headers: { token: `Bearer ${accessToken}` },
            params: actor,
        });
        dispatch(getMessagesSuccess(res.data));
    } catch (error) {
        dispatch(getMessagesFailed());
    }
};

export const updateMsg = async (accessToken, dispatch, id, content, axiosJWT) => {
    dispatch(updateMessageStart());
    try {
        await axiosJWT.put(`${url}/api/message/${id}`, content, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(updateMessageSuccess());
    } catch (error) {
        dispatch(updateMessageSuccess());
    }
};

export const getMsgsGroupChat = async (accessToken, dispatch, actor, axiosJWT) => {
    dispatch(getMessagesStart());
    try {
        const res = await axiosJWT.get(`${url}/api/groupChat`, {
            headers: { token: `Bearer ${accessToken}` },
            params: actor,
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

export const getListGroupChat = async (accessToken, userId, dispatch, axiosJWT) => {
    dispatch(getGroupChatStart());
    try {
        const res = await axiosJWT.get(`${url}/api/groupChat/` + userId, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getGroupChatSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(getGroupChatFailed());
    }
};

export const getIndividualChat = async (accessToken, actor, dispatch, axiosJWT) => {
    dispatch(addIndividualChatStart());
    try {
        const res = await axiosJWT.get(`${url}/api/individualChat/a/chat`, {
            headers: { token: `Bearer ${accessToken}` },
            params: actor,
        });
        dispatch(addIndividualChatSuccess(res.data[0]._id));
    } catch (error) {
        dispatch(addIndividualChatFailed());
    }
};
