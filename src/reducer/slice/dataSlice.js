import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "dataSlice",
    initialState: {
        pokemons: [],
        searchFilter: "",
    },
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload;
        },
        setSearchFilter: (state, action) => {
            state.searchFilter = action.payload;
        },
        setFavorite: (state, action) => {
            const index = state.pokemons.findIndex(
                (pokemon) => pokemon.id === action.payload.pokemonId
            );

            if (index >= 0) {
                const isFav = state.pokemons[index].favorite; // false o true
                state.pokemons[index].favorite = !isFav;
            }
        },
    },
});

export const { setPokemons, setSearchFilter, setFavorite } = dataSlice.actions;

export default dataSlice.reducer;
