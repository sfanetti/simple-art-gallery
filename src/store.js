import { configureStore } from '@reduxjs/toolkit';
import artDataReducer from './features/dataSlice';

const store = configureStore({
    reducer: artDataReducer
});

export default store;