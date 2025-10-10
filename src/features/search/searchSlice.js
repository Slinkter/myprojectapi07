import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchFilter: "",
    },
    reducers: {
        setSearchFilter: (state, action) => {
            state.searchFilter = action.payload.toLowerCase();
        },
    },
});

export const { setSearchFilter } = searchSlice.actions;
export default searchSlice.reducer;
