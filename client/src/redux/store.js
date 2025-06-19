import { configureStore } from '@reduxjs/toolkit'
import placeReducer from './placeSlice'
import hotelReducer from './hotelSlice'
import packageReducer from './packageSlice.js'
export const store = configureStore({
    reducer: {
        place: placeReducer,
        hotel: hotelReducer,
        package: packageReducer
    }


})