import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PURGE } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import user from './store/userSlice.js';

const reducers = combineReducers({
    user:user.reducer
})

const persistConfig = {
    key: 'jenfra',
    storage,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [PURGE]
            }
        })
})