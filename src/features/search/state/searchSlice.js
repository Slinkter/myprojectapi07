import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchFilter: "",
    },
    reducers: {
        /**
         * Sets the search filter value.
         * The filter is converted to lowercase for case-insensitive searching.
         * @param {object} state - The current state.
         * @param {object} action - The Redux action.
         * @param {string} action.payload - The new search filter.
         */
        setSearchFilter: (state, action) => {
            state.searchFilter = action.payload.toLowerCase();
        },
    },
});

export const { setSearchFilter } = searchSlice.actions;
export default searchSlice.reducer;
