import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users : [],
    status : "idle",
    error : null
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async()=>{
    const res = await axios.get(" https://jsonplaceholder.typicode.com/users ")
    return res.data
})


const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers : (builder)=>{
        builder.addCase(fetchUsers.fulfilled,(state , action)=>{
           state.status = 'succeeded';
           state.users = action.payload
        })
        builder.addCase(fetchUsers.pending,(state , action)=>{
           state.status = "Loading";
        })
        builder.addCase(fetchUsers.rejected,(state , action)=>{
           state.status = "Failed"
           state.error = action.error.message;
        })
    }
})
export default userSlice.reducer;