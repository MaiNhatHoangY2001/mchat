import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        individualChat: {
            isFetching: false,
            idChat: null,
            success: false,
            error: false,
            actor: null,
        },
        message: {
            content: null,
            isFetching: false,
            success: false,
            error: false,
        },
    },
    reducers: {
        addIndividualChatStart: (state) => {
            state.individualChat.isFetching = true;
        },
        addIndividualChatSuccess: (state, action) => {
            state.individualChat.isFetching = false;
            state.individualChat.idChat = action.payload;
            state.individualChat.success = true;
        },
        addIndividualChatFailed: (state) => {
            state.individualChat.isFetching = false;
            state.individualChat.error = true;
        },
        getIndividualChatStart: (state) => {
            state.individualChat.isFetching = true;
        },
        getIndividualChatSuccess: (state, action) => {
            state.individualChat.isFetching = false;
            state.individualChat.actor = action.payload;
            state.individualChat.success = true;
        },
        getIndividualChatFailed: (state) => {
            state.individualChat.isFetching = false;
            state.individualChat.error = true;
        },
        addMessageStart: (state) => {
            state.message.isFetching = true;
        },
        addMessageSuccess: (state) => {
            state.message.isFetching = false;
            state.message.success = true;
        },
        addMessageFailed: (state) => {
            state.message.isFetching = false;
            state.message.error = true;
        },
        updateMessageStart: (state) => {
            state.message.isFetching = true;
        },
        updateMessageSuccess: (state) => {
            state.message.isFetching = false;
            state.message.success = true;
        },
        updateMessageFailed: (state) => {
            state.message.isFetching = false;
            state.message.error = true;
        },
        getMessagesStart: (state) => {
            state.message.content = null;
            state.message.isFetching = true;
        },
        getMessagesSuccess: (state, action) => {
            state.message.isFetching = false;
            state.message.success = true;
            state.message.content = action.payload;
        },
        getMessagesFailed: (state) => {
            state.message.isFetching = false;
            state.message.error = true;
        },
        clearActor: (state) => {
            state.individualChat.idChat = null;
            state.individualChat.actor = null;
        },
    },
});

export const {
    addIndividualChatFailed,
    addIndividualChatStart,
    addIndividualChatSuccess,
    addMessageFailed,
    addMessageStart,
    addMessageSuccess,
    getMessagesFailed,
    getMessagesStart,
    getMessagesSuccess,
    getIndividualChatFailed,
    getIndividualChatStart,
    getIndividualChatSuccess,
    clearActor,
    updateMessageStart,
    updateMessageSuccess,
    updateMessageFailed,
} = chatSlice.actions;

export default chatSlice.reducer;
