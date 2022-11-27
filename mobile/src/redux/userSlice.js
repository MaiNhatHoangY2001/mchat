import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        sender: {
            user: null,
        },
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
        changePass: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        changePassStart: (state) => {
            state.changePass.isFetching = true;
        },
        changePassSuccess: (state) => {
            state.changePass.isFetching = false;
            state.changePass.success = true;
            state.changePass.error = false;
        },
        changePassFailed: (state) => {
            state.changePass.isFetching = false;
            state.changePass.success = false;
            state.changePass.error = true;
        },
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        setSender: (state, action) => {
            state.sender.user = action.payload;
        },
        clearSender: (state) => {
            state.sender.user = null;
        },

        getAllNumberStart: (state) => {
            state.users.isFetching = true;
        },
        getAllNumberSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allNumber = action.payload;
        },
        getAllNumberFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    setSender,
    clearSender,
    changePassStart,
    changePassFailed,
    changePassSuccess,
    getAllNumberFailed,
    getAllNumberStart,
    getAllNumberSuccess
} = userSlice.actions;

export default userSlice.reducer;
