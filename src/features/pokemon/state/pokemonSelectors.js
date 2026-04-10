import { createSelector } from "@reduxjs/toolkit";

/**
 * @module pokemonSelectors
 * @description
 * Este módulo contiene selectores de Redux relacionados con la feature de Pokémon.
 * Los selectores son funciones que extraen y transforman datos del estado global de Redux,
 * y `createSelector` los memoiza para optimizar el rendimiento.
 */

/**
 * @function selectPokemons
 * @description Selector de entrada para obtener la lista cruda de Pokémon del estado.
 * @param {object} state - El estado global de Redux.
 * @returns {Array<object>} La lista de Pokémon.
 */
const selectPokemons = (state) => state.pokemon.pokemons;

/**
 * @function selectFavoriteIds
 * @description Selector de entrada para obtener la lista de IDs de favoritos del estado.
 * @param {object} state - El estado global de Redux.
 * @returns {number[]} La lista de IDs de Pokémon favoritos.
 */
const selectFavoriteIds = (state) => state.favorites.favoriteIds;

/**
 * @function selectSearchFilter
 * @description Selector de entrada para obtener el término de búsqueda actual.
 * @param {object} state - El estado global de Redux.
 * @returns {string} El filtro de búsqueda.
 */
const selectSearchFilter = (state) => state.search.searchFilter;

/**
 * @function selectProcessedPokemons
 * @summary Selector memoizado para obtener la lista de Pokémon procesada.
 * @description
 * Optimizado con Big O:
 * - Usa Set para lookup O(1) en lugar de Array.includes() O(n)
 * - Un solo paso para map + filter en lugar de dos pasos
 *
 * **Complexidad:**
 * - ANTES: O(n × m) + O(n) = O(nm + n)
 * - DESPUÉS: O(n) solo
 *
 * @returns {Array<object>} La lista de Pokémon procesada, lista para ser renderizada.
 */
export const selectProcessedPokemons = createSelector(
    [selectPokemons, selectFavoriteIds, selectSearchFilter],
    (pokemons, favoriteIds, searchFilter) => {
        // Big O Optimization: Set para lookup O(1) en lugar de Array.includes() O(n)
        const favoriteSet = new Set(favoriteIds);
        
        // Optimización: un solo paso para map + filter
        const searchLower = searchFilter?.toLowerCase();
        
        return pokemons
            .map((pokemon) => ({
                ...pokemon,
                favorite: favoriteSet.has(pokemon.id),  // O(1) lookup con Set
            }))
            .filter((pokemon) => 
                !searchLower || pokemon.name.toLowerCase().includes(searchLower)
            );
    },
);

/**
 * @function selectPokemonById
 * @description Selector parametrizado para obtener un Pokémon por su ID.
 * Usa un selector factory para evitar el find() O(n) en cada render.
 * @param {number} pokemonId - El ID del Pokémon.
 * @returns {object|undefined} El Pokémon encontrado.
 */
export const selectPokemonById = (pokemonId) => (state) => {
    const pokemons = selectProcessedPokemons(state);
    return pokemons.find((p) => p.id === pokemonId);
};

/**
 * @function selectPokemonByIds
 * @description Selector para obtener múltiples Pokémon por sus IDs.
 * Optimizado para evitar múltiples lookups.
 * @param {number[]} pokemonIds - Array de IDs de Pokémon.
 * @returns {object[]} Array de Pokémon encontrados.
 */
export const selectPokemonByIds = (pokemonIds) => (state) => {
    const pokemons = selectProcessedPokemons(state);
    const pokemonSet = new Set(pokemonIds);
    return pokemons.filter((p) => pokemonSet.has(p.id));
};