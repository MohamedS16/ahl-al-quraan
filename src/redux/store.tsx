import { configureStore } from "@reduxjs/toolkit";
import swrSlice from "./slices/swrSlice";

const store = configureStore({
    reducer :{
        'swr' : swrSlice.reducer
    }
})

export default store