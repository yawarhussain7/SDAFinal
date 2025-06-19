import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packageDetail: {},
};

const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {
        setPackageDetail(state, action) {
            state.packageDetail = action.payload;
        },
    },
});

export const { setPackageDetail } = packageSlice.actions;

export default packageSlice.reducer;