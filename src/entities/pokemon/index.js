/**
 * @module pokemon-entity
 * @description exports de la entidad Pokemon.
 */

export { mapToPokemonEntity, mapToPokemonList } from "./model/mapper";
export { selectProcessedPokemons, selectPokemons } from "./model/selectors";
export { enrichWithFavorites, filterBySearch } from "./model/utils";
export * from "./types";
export { POKEMON_SEED } from "./data/seed";