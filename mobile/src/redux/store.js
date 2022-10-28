import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import chatReducer from './chatSlice';
import groupChatReducer from './groupChatSlice';
import fileReducer from './fileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    groupChat: groupChatReducer,
    file: fileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    //devTools: false,
});

export let persistor = persistStore(store);
