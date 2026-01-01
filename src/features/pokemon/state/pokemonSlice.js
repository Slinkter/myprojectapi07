import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonList } from "@/features/pokemon/services/pokemonApi";

/**
 * Async thunk for fetching a paginated list of Pokémon.
 * @param {{page: number, limit: number}} params - The pagination parameters.
 * @param {number} params.page - The current page number.
 * @param {number} params.limit - The number of items per page.
 * @returns {Promise<object>} A promise that resolves to the paginated Pokémon data.
 */
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

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemons: [],
        isLoading: false,
        isError: false,
        error: null,
        currentPage: 1,
        itemsPerPage: 20, // Default items per page
        totalCount: 0, // Total number of pokemons available from API
    },
    reducers: {
        /**
         * Sets the current page number for pagination.
         * @param {object} state - The current state.
         * @param {object} action - The Redux action.
         * @param {number} action.payload - The new page number.
         */
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.pokemons = action.payload.results.map((pokemon) => ({
                    ...pokemon,
                    favorite: false, // Default to false, will be overridden by favoritesSlice data
                }));
                state.totalCount = action.payload.count; // Store total count
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});

export const { setPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;

