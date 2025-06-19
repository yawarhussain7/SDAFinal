import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    placeDetail: {},
};

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        setPlace: (state, action) => {
            state.placeDetail = action.payload;

        },
    },
});

export const { setPlace } = placeSlice.actions;
export default placeSlice.reducer;