import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import productReducer from './productSlice';

const store = configureStore({
    reducer:{
        cart:cartSlice,
        users: userSlice,
        products: productReducer,
            
    }
})
export default store;