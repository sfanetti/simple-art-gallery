import { createSlice } from '@reduxjs/toolkit';

// define an initial state
const initialState = {}

export const dataSlice = createSlice({
    name: '', // name the slice
    initialState,
    reducers: {
        // implement reducers
    }
});

export const {} = dataSlice.actions;
export default dataSlice.reducer;