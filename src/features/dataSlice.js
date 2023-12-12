import nocache from '../utils/nocache';
import { createSlice } from '@reduxjs/toolkit';

// define an initial state
const initialState = {
    imageId: 10245,
    artData: {},
}

export const dataSlice = createSlice({
    name: 'data', // name the slice
    initialState,
    reducers: {
        loadData: (state, { payload: artData }) => {
            state.artData = artData;
        },
        setImageId: (state, { payload: imageId }) => {
            state.imageId = imageId;
        },
        nextImage: state => {
            state.imageId++;
        },
        prevImage: state => {
            state.imageId--;
        },
    }
});
export const {loadData, setImageId, nextImage, prevImage} = dataSlice.actions;
export default dataSlice.reducer;

export const fetchData = () => {
    const fetchDataThunk = async (dispatch, getState) => {
        const { imageId } = getState();
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${imageId}`)
        const json = await response.json();
        const data = nocache(json)('primaryImage');
        dispatch(loadData(data));
    }
    return fetchDataThunk;
}
