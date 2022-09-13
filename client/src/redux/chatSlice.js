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
        getMessagesStart: (state) => {
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
    getIndividualChatSuccess
} = chatSlice.actions;

export default chatSlice.reducer;
