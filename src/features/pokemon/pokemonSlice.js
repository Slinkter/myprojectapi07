import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonList } from "../../services/api/pokemon";

export const fetchPokemons = createAsyncThunk(
    "pokemon/fetchPokemons",
    async (_, { rejectWithValue }) => {
        try {
            const pokemons = await getPokemonList();
            return pokemons;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    pokemons: [],
    searchFilter: "",
    isLoading: false,
    error: null,
};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setSearchFilter: (state, action) => {
            state.searchFilter = action.payload.toLowerCase();
        },
        setFavorite: (state, action) => {
            const pokemon = state.pokemons.find(
                (p) => p.id === action.payload.pokemonId
            );
            if (pokemon) {
                pokemon.favorite = !pokemon.favorite;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pokemons = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { setSearchFilter, setFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;
