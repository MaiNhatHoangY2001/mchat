import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
    name: 'file',
    initialState: {
        upload: {
            success: false,
            error: false,
            isFetching: false,
            url: '',
        },
        getFile: {
            success: false,
            error: false,
            isFetching: false,
        },
    },
    reducers: {
        getFileStart: (state) => {
            state.getFile.isFetching = true;
        },
        getFileSuccess: (state, action) => {
            state.getFile.isFetching = false;
            state.getFile.actor = action.payload;
            state.getFile.success = true;
        },
        getFileFailed: (state) => {
            state.getFile.isFetching = false;
            state.getFile.error = true;
        },
        uploadStart: (state) => {
            state.upload.isFetching = true;
        },
        uploadSuccess: (state, action) => {
            state.upload.isFetching = false;
            state.upload.url = action.payload;
            state.upload.success = true;
        },
        uploadFailed: (state) => {
            state.upload.isFetching = false;
            state.upload.error = true;
        },
    },
});

export const { getFileFailed, getFileStart, getFileSuccess, uploadFailed, uploadStart, uploadSuccess } =
    fileSlice.actions;

export default fileSlice.reducer;
