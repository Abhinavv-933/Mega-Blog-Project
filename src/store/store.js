import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'; 

const store = configureStore({
    reducer:{ 
        auth:authSlice,
       // post: postSlice
       // TODO: Add more slices here for post or for reducer
    }

});

export default store;