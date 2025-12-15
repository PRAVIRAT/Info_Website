import {createSlice} from "@reduxjs/toolkit";

let initialState=[];

const InfoSlice= createSlice({
    name: "Info",
    initialState,
    reducers: {
        setInfo: (state,action)=> action.payload,
        newInfo: (state,action)=> { state.push(action.payload) },
        editInfo: (state,action)=> action.payload,
        deleteInfo: (state,action)=> state.filter((item,index)=> index!==action.payload),
    }
});

export default InfoSlice.reducer;
export const {setInfo, newInfo, editInfo, deleteInfo}= InfoSlice.actions;
export const SelectAllInfo= (state)=> state.info;