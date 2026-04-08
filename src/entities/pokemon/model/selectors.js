import { createSelector } from "@reduxjs/toolkit";
import { enrichWithFavorites, filterBySearch } from "./utils";

/**
 * @module pokemonSelectors
 * @description Selectores de la entidad Pokemon.
 */

const selectPokemons = (state) => state.pokemon.pokemons;
const selectFavoriteIds = (state) => state.favorites.favoriteIds;
const selectSearchFilter = (state) => state.search.searchFilter;

export const selectProcessedPokemons = createSelector(
    [selectPokemons, selectFavoriteIds, selectSearchFilter],
    (pokemons, favoriteIds, searchFilter) => {
        // Delegamos la lógica de negocio a la capa de utilidades del dominio (Surgical Decoupling)
        const enriched = enrichWithFavorites(pokemons, favoriteIds);
        return filterBySearch(enriched, searchFilter);
    },
);

export { selectPokemons };

