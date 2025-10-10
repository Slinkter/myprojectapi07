import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {Object} UIState
 * @property {boolean} loading - Indicates if a loading operation is in progress.
 * @property {string|null} error - Stores any error message.
 */

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {
        /**
         * Sets the loading state.
         * @param {UIState} state - The current UI state.
         * @param {Object} action - The action object.
         * @param {boolean} action.payload - The new loading state.
         */
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        /**
         * Sets an error message.
         * @param {UIState} state - The current UI state.
         * @param {Object} action - The action object.
         * @param {string|null} action.payload - The error message or null.
         */
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLoading, setError } = uiSlice.actions;
export default uiSlice.reducer;
