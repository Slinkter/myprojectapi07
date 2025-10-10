import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonList } from "../../services/api/pokemon";

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemons: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        itemsPerPage: 20, // Default items per page
        totalCount: 0, // Total number of pokemons available from API
    },
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
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
                state.pokemons = action.payload.results.map(pokemon => ({
                    ...pokemon,
                    favorite: false, // Default to false, will be overridden by favoritesSlice data
                }));
                state.totalCount = action.payload.count; // Store total count
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const fetchPokemons = createAsyncThunk(
    "pokemon/fetchPokemons",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const offset = (page - 1) * limit;
            const data = await getPokemonList(offset, limit);
            return data; // This now includes { count, results }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const { setPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;
