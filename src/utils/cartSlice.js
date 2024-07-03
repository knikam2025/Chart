import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        item: []  
    },
    reducers: {
        addItem: (state, action) => {
            state.item.push(action.payload)  
        },
        clearCart: (state) => { 
            state.item.length = 0
        }
    }
})  


export const { addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
