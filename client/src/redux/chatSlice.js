import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chat: {
            chatType: null,
            isFetching: false,
            success: false,
            error: false,
        },
        individualChat: {
            isFetching: false,
            success: false,
            error: false,
        },
        chatHistory: {
            sender: null,
            isFetching: false,
            success: false,
            error: false,
        },
        message: {
            content: null,
            isFetching: false,
            success: false,
            error: false,
        },
    },
    reducers: {
        addChatStart: (state) => {
            state.chat.isFetching = true;
        },
        addChatSuccess: (state, action) => {
            state.chat.isFetching = false;
            state.chat.chatType = action.payload;
            state.chat.success = true;
        },
        addChatFailed: (state) => {
            state.chat.isFetching = false;
            state.chat.error = true;
        },
        addIndividualChatStart: (state) => {
            state.individualChat.isFetching = true;
        },
        addIndividualChatSuccess: (state) => {
            state.individualChat.isFetching = false;
            state.individualChat.success = true;
        },
        addIndividualChatFailed: (state) => {
            state.individualChat.isFetching = false;
            state.individualChat.error = true;
        },
        addChatHistoryStart: (state) => {
            state.chatHistory.isFetching = true;
        },
        addChatHistorySuccess: (state, action) => {
            state.chatHistory.isFetching = false;
            state.chatHistory.success = true;
            state.chatHistory.sender = action.payload;
        },
        addChatHistoryFailed: (state) => {
            state.chatHistory.isFetching = false;
            state.chatHistory.error = true;
        },
        addMessageStart: (state) => {
            state.message.isFetching = true;
        },
        addMessageSuccess: (state, action) => {
            state.message.isFetching = false;
            state.message.success = true;
            state.message.sender = action.payload;
        },
        addMessageFailed: (state) => {
            state.message.isFetching = false;
            state.message.error = true;
        },
    },
});

export const {
    addChatStart,
    addChatFailed,
    addChatSuccess,
    addIndividualChatFailed,
    addIndividualChatStart,
    addIndividualChatSuccess,
    addChatHistoryFailed,
    addChatHistoryStart,
    addChatHistorySuccess,
    addMessageFailed,
    addMessageStart,
    addMessageSuccess,
} = chatSlice.actions;

export default chatSlice.reducer;
