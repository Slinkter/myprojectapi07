import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonApi } from "@/features/pokemon/api/pokemonApi";

/**
 * @module pokemonSlice
 * @description
 * Este módulo define el "slice" de Redux para la gestión de los datos de Pokémon.
 * Incluye la lógica para cargar la lista de Pokémon de forma asíncrona desde la API.
 */

/**
 * @typedef {object} Pokemon
 * @property {number} id - El ID del Pokémon.
 * @property {string} name - El nombre del Pokémon.
 * @property {object} sprites - Objeto con las URLs de los sprites.
 * @property {Array<object>} types - Array con los tipos del Pokémon.
 * @property {boolean} [favorite] - Propiedad opcional añadida por selectores.
 */

/**
 * @typedef {object} PokemonState
 * @property {Array<Pokemon>} pokemons - La lista de Pokémon cargada actualmente.
 * @property {boolean} isLoading - `true` si hay una petición de carga en curso.
 * @property {boolean} isError - `true` si la última petición de carga falló.
 * @property {string|null} error - El mensaje de error, si lo hay.
 * @property {number} totalCount - El número total de Pokémon disponibles en la API.
 */

/**
 * @function fetchPokemons
 * @summary Acción asíncrona (thunk) para cargar una página de Pokémon desde la API.
 * @description
 * Orquesta el ciclo de vida completo de la petición:
 * 1. Despacha `pending` al iniciar.
 * 2. Llama a `pokemonApi.getPokemons` con el `offset` y `limit` adecuados.
 * 3. Si tiene éxito, despacha `fulfilled` con los datos (`results`, `count`).
 * 4. Si falla, despacha `rejected` con un mensaje de error.
 *
 * @param {{page: number, limit: number}} params - Parámetros para la paginación.
 * @returns {Promise<object>} Una promesa que resuelve con los datos de la API o es rechazada.
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
 * El estado inicial para el slice de Pokémon.
 * @type {PokemonState}
 */
const initialState = {
  pokemons: [],
  isLoading: false,
  isError: false,
  error: null,
  totalCount: -1,
};

/**
 * @constant {import('@reduxjs/toolkit').Slice} pokemonSlice
 * @summary Slice de Redux para gestionar el estado de los Pokémon.
 * @description
 * Maneja el almacenamiento de la lista de Pokémon y los estados de red
 * asociados a su carga (`isLoading`, `isError`, `error`).
 * Utiliza `extraReducers` para responder a las acciones del `fetchPokemons` thunk.
 */
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemons = action.payload.results; // Asignación directa, el selector se encarga de los favoritos.
        state.totalCount = action.payload.count;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

/**
 * @constant {import('@reduxjs/toolkit').Reducer<PokemonState>} reducer
 * @summary Reducer principal del slice de Pokémon.
 */
export default pokemonSlice.reducer;
