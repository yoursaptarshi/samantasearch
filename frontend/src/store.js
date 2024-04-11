import {configureStore} from "@reduxjs/toolkit"
import {userReducer}from "./Reducers/user"
import { searchReducer } from "./Reducers/search";
import { membership_reducer } from "./Reducers/memberships";

const store = configureStore({
    reducer:{
        user:userReducer,
        search:searchReducer,
        membership:membership_reducer
    },
});

export default store;