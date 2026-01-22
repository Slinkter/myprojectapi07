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
 * Calculo derivado de los datos de pokemon, favoritos y búsqueda.
 *
 * **Responsabilidades:**
 * 1.  **Enriquecimiento de datos:** Combina `state.pokemon.pokemons` con `state.favorites.favoriteIds` para añadir una propiedad `favorite: boolean` a cada objeto de Pokémon.
 * 2.  **Filtrado:** Filtra la lista de Pokémon enriquecida basándose en el `state.search.searchFilter`.
 *
 * **Efectos Secundarios:**
 * - No tiene efectos secundarios (es una función pura memoizada).
 *
 * Gracias a la memoización de `createSelector`, estos cálculos costosos solo se
 * volverán a ejecutar si los datos de entrada (`pokemons`, `favoriteIds`, o `searchFilter`) cambian,
 * previniendo re-renders innecesarios en la UI.
 *
 * @returns {Array<object>} La lista de Pokémon procesada, lista para ser renderizada.
 */
export const selectProcessedPokemons = createSelector(
    [selectPokemons, selectFavoriteIds, selectSearchFilter],
    (pokemons, favoriteIds, searchFilter) => {
        // Primero, añade el estado de 'favorite' a cada Pokémon
        const favoritedPokemons = pokemons.map((pokemon) => ({
            ...pokemon,
            favorite: favoriteIds.includes(pokemon.id),
        }));

        // Luego, filtra por el término de búsqueda si existe
        if (!searchFilter) {
            return favoritedPokemons;
        }

        const lowercasedFilter = searchFilter.toLowerCase();
        return favoritedPokemons.filter((p) =>
            p.name.toLowerCase().includes(lowercasedFilter),
        );
    },
);
