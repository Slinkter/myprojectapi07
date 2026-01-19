import { createSelector } from "@reduxjs/toolkit";

// Input selectors
const selectPokemons = (state) => state.pokemon.pokemons;
const selectFavoriteIds = (state) => state.favorites.favoriteIds;
const selectSearchFilter = (state) => state.search.searchFilter;

/**
 * Memoized selector that processes the raw pokemon list.
 * It performs two main operations:
 * 1. Merges the `favoriteIds` to add a `favorite` boolean to each pokemon.
 * 2. Filters the list based on the `searchFilter`.
 *
 * This selector is efficient because it will only re-calculate its output if
 * one of its inputs (`pokemons`, `favoriteIds`, or `searchFilter`) changes.
 */
export const selectProcessedPokemons = createSelector(
  [selectPokemons, selectFavoriteIds, selectSearchFilter],
  (pokemons, favoriteIds, searchFilter) => {
    // First, add the 'favorite' status to each Pokémon
    const favoritedPokemons = pokemons.map((pokemon) => ({
      ...pokemon,
      favorite: favoriteIds.includes(pokemon.id),
    }));

    // Then, filter by the search term if it exists
    if (!searchFilter) {
      return favoritedPokemons;
    }
    return favoritedPokemons.filter((p) =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }
);
