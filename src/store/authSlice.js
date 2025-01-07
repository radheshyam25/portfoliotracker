import {createSlice} from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        },
        updatestocks:(state,action)=>{
            
            state.userData.stocks=action.payload.stocks;
        }
    }
})

export const {login,logout,updatestocks}=authSlice.actions;

export default authSlice.reducer;
