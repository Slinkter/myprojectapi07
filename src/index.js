import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import uiReducer from "./slices/uiSlice";

/**
 * @typedef {Object} RootState
 * @property {import('./slices/dataSlice').DataState} data - The data slice state.
 * @property {import('./slices/uiSlice').UIState} ui - The UI slice state.
 */

/**
 * Combines all individual reducers into a single root reducer.
 * This is the central point for managing the application's state.
 * @type {import('@reduxjs/toolkit').Reducer<RootState>}
 */
const rootReducer = combineReducers({
    data: dataReducer,
    ui: uiReducer,
});

export default rootReducer;
