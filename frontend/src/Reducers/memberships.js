import {createReducer} from "@reduxjs/toolkit"

const initialState={
    success:false,
    memberships:[],
    error:null,
    purchase:null
}
export const membership_reducer = createReducer(initialState,{
    createMembershipReuest:(state)=>{
        state.loading=true;
    },
    createMembershipSuccess:(state,action)=>{
        state.loading=false;
        state.success=true;
    },
    createMembershipFailure:(state)=>{
        state.loading=false;
        state.success=null;
    },
    GetAllMembershipsRequest:(state)=>{
        state.loading=true;
    },
    GetAllMembershipsSuccess:(state,action)=>{
        state.loading=false;
        state.memberships=action.payload
    },
    GetAllMembershipsFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    buyMembershipRequest:(state)=>{
        state.loading=true;
        state.purchase=null
    },
    buyMembershipSuccess:(state)=>{
        state.loading=false;
        state.purchase=true
    },
    buyMembershipFailure:(state)=>{
        state.loading=false;
        state.purchase=false
    }
})
