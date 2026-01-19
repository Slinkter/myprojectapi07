import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonApi } from "@/features/pokemon/api/pokemonApi";

/**
 * Acción Asíncrona (Thunk) `fetchPokemons`.
 *
 * **Responsabilidad:**
 * * Orquesta la llamada a la API y el manejo de estados de carga/éxito/error.
 * * Calcula el offset basado en la página solicitada.
 *
 * **Flujo:**
 * 1. Dispara `pending`.
 * 2. Llama a `pokemonApi.getPokemons`.
 * 3. Si éxito: Dispara `fulfilled` con datos.
 * 4. Si error: Dispara `rejected` con mensaje.
 *
 * @param {Object} params - Parámetros de paginación
 * @param {number} params.page - Número de página (1-based index).
 * @param {number} params.limit - Items por página.
 */
export const fetchPokemons = createAsyncThunk(
    "pokemon/fetchPokemons",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const offset = (page - 1) * limit;
            const data = await pokemonApi.getPokemons(offset, limit);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

/**
 * Slice Redux `pokemonSlice`.
 *
 * **Responsabilidad:**
 * * Gestiona el estado global de la lista de Pokémon visible.
 * * Maneja los estados transicionales de red (loading, error, success).
 * * Controla la paginación del lado del cliente/estado.
 *
 * **Estado inicial:**
 * * `pokemons`: Array de objetos Pokémon resumidos.
 * * `isLoading`, `isError`, `error`: Flags de estado de red.
 * * `currentPage`, `totalCount`: Metadatos de paginación.
 */
const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemons: [],
        isLoading: false,
        isError: false,
        error: null,
        totalCount: 0,
    },
    reducers: {},
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

export default pokemonSlice.reducer;
