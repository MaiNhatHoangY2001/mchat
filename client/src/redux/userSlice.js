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
        user: {
            isFetching: false,
            error: false,
            success: false,
        }
    },
    reducers: {

        updateUserStart: (state) => {
            state.user.isFetching = true;
        },
        updateUserSuccess: (state) => {
            state.user.isFetching = false;
            state.user.error = false;
        },
        updateUserFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        },
        changePassStart: (state) => {
            state.changePass.isFetching = true;
        },
        changePassSuccess: (state) => {
            state.changePass.isFetching = false;
            state.changePass.error = false;
        },
        changePassFailed: (state) => {
            state.changePass.isFetching = false;
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
    updateUserStart,
    updateUserFailed,
    updateUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
