import { createSlice } from '@reduxjs/toolkit';

const groupChatSlice = createSlice({
    name: 'groupChat',
    initialState: {
        groupChat: {
            success: false,
            error: false,
            actor: null,
            isFetching: false,
            isGroupChat: false,
        },
    },
    reducers: {
        addGroupChatStart: (state) => {
            state.groupChat.isFetching = true;
        },
        addGroupChatSuccess: (state) => {
            state.groupChat.isFetching = false;
            state.groupChat.success = true;
        },
        addGroupChatFailed: (state) => {
            state.groupChat.isFetching = false;
            state.groupChat.error = true;
        },
        getGroupChatStart: (state) => {
            state.groupChat.isFetching = true;
        },
        getGroupChatSuccess: (state, action) => {
            state.groupChat.isFetching = false;
            state.groupChat.actor = action.payload;
            state.groupChat.success = true;
        },
        getGroupChatFailed: (state) => {
            state.groupChat.isFetching = false;
            state.groupChat.error = true;
        },
        setIsGroupChat: (state, action) => {
            state.groupChat.isGroupChat = action.payload;
        },
    },
});

export const {
    getGroupChatStart,
    getGroupChatFailed,
    getGroupChatSuccess,
    setIsGroupChat,
    addGroupChatStart,
    addGroupChatFailed,
    addGroupChatSuccess,
} = groupChatSlice.actions;

export default groupChatSlice.reducer;
