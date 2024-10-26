import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./slice/uiSlice";
import dataReducer from "./slice/dataSlice";

const rootReducer = combineReducers({
    ui: uiReducer,
    data: dataReducer,
});

export default rootReducer;
