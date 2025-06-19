 import { createSlice } from '@reduxjs/toolkit';

 const hotelSlice = createSlice({
     name: 'hotel',
     initialState: {
         hotelDetail: null,
         roomList: [],
     },
     reducers: {
         setHotelDetail: (state, action) => {
             state.hotelDetail = action.payload;
         },
         setRoomList: (state, action) => {
             state.roomList = action.payload;
         },
     },
 });

 export const { setHotelDetail, setRoomList } = hotelSlice.actions;
 export default hotelSlice.reducer;