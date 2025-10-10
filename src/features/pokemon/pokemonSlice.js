import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonList } from "../../services/api/pokemon";

// La clave única para guardar los favoritos en el localStorage.
const FAVORITES_STORAGE_KEY = 'pokemon_favorites';

/**
 * Carga los IDs de los Pokémon favoritos desde el localStorage.
 * Es una buena práctica envolver las interacciones con localStorage en un try-catch,
 * ya que puede fallar en algunos navegadores o en modo incógnito.
 * @returns {number[]} Un array con los IDs de los Pokémon favoritos.
 */
const getFavoritesFromStorage = () => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("No se pudieron cargar los favoritos desde localStorage", error);
        return [];
    }
};

/**
 * Guarda un array de IDs de Pokémon favoritos en el localStorage.
 * @param {number[]} favoriteIds - Un array con los IDs de los Pokémon a guardar.
 */
const saveFavoritesToStorage = (favoriteIds) => {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
        console.error("No se pudieron guardar los favoritos en localStorage", error);
    }
};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemons: [],
        searchFilter: "",
        isLoading: false,
        error: null,
    },
    reducers: {
        setSearchFilter: (state, action) => {
            // El reducer se mantiene como la única fuente de verdad para la transformación de datos.
            state.searchFilter = action.payload.toLowerCase();
        },
        setFavorite: (state, action) => {
            const pokemon = state.pokemons.find(
                (p) => p.id === action.payload.pokemonId
            );
            if (pokemon) {
                pokemon.favorite = !pokemon.favorite;
                // Después de actualizar el estado, se guarda la nueva lista de favoritos en localStorage
                // para hacerla persistente.
                const favoriteIds = state.pokemons.filter(p => p.favorite).map(p => p.id);
                saveFavoritesToStorage(favoriteIds);
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
                // Al recibir los pokémons de la API, se cruzan con los favoritos de localStorage.
                const favoriteIds = getFavoritesFromStorage();
                state.pokemons = action.payload.map(pokemon => ({
                    ...pokemon,
                    // Se marca como favorito si el ID del pokémon está en la lista de favoritos guardada.
                    favorite: favoriteIds.includes(pokemon.id),
                }));
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

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

export const { setSearchFilter, setFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;
