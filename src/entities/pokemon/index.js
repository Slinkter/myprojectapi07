/**
 * @module pokemon-entity
 * @description Exports de la entidad Pokemon (tipos, mapper, utils puras, seed).
 * Nota: Los Redux selectors han sido movidos a features/pokemon/state/pokemonSelectors.js
 * siguiendo el principio FSD de que las entities no deben contener lógica de estado.
 */

export { mapToPokemonEntity, mapToPokemonList } from "./model/mapper";
export { enrichWithFavorites, filterBySearch } from "./model/utils";
export * from "./types";
export { POKEMON_SEED } from "./data/seed";
