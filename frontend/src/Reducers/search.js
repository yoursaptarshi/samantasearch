import { createReducer } from "@reduxjs/toolkit";

const initialstate ={
    webResults : [],
    imageResults : [],
    
}

export const searchReducer = createReducer(initialstate,{
    
    searchResults:(state,action)=>{
        state.webResults = action.webResults;
        state.imageResults = action.imageResults;
        state.mapResults = action.mapResults;
    },
    searchError:(state,action)=>{
        state.error = action.payload
    },

    CrawlRequest:(state)=>{
        state.response = false;
    },
    CrawlSuccess:(state)=>{
        state.response=true
    },
    CrawlError:(state)=>{
        state.error=null;
    }
})