import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../modules/auth/store/auth';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
