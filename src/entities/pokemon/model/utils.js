/**
 * @module pokemonUtils
 * @description
 * Funciones puras de dominio para la entidad Pokemon.
 * Esta capa es agnóstica al estado de la aplicación (Redux) y a la UI (React).
 * Se encarga exclusivamente de la transformación y lógica de negocio de los datos.
 */

/**
 * Enriquece la lista de Pokémon añadiendo el estado de favorito.
 * @param {Array} pokemons - Lista de objetos Pokemon.
 * @param {number[]} favoriteIds - Lista de IDs marcados como favoritos.
 * @returns {Array} Nueva lista de Pokémon con propiedad `favorite`.
 */
export const enrichWithFavorites = (pokemons, favoriteIds) => {
    return pokemons.map((pokemon) => ({
        ...pokemon,
        favorite: favoriteIds.includes(Number(pokemon.id)),
    }));
};

/**
 * Filtra una lista de Pokémon basándose en un término de búsqueda.
 * @param {Array} pokemons - Lista de Pokémon ya enriquecida.
 * @param {string} searchFilter - Término de búsqueda.
 * @returns {Array} Lista filtrada de Pokémon.
 */
export const filterBySearch = (pokemons, searchFilter) => {
    if (!searchFilter) return pokemons;
    
    const lowercasedFilter = searchFilter.toLowerCase();
    return pokemons.filter((p) => 
        p.name.toLowerCase().includes(lowercasedFilter)
    );
};

/**
 * Transforma el formato de la API a un formato simplificado para la UI.
 * @param {object} pokemon - Objeto crudo de la API.
 * @returns {object} Objeto normalizado.
 */
export const normalizePokemon = (pokemon) => ({
    id: Number(pokemon.id),
    name: pokemon.name,
    types: pokemon.types || [],
    sprites: pokemon.sprites || {},
});

export default {
    enrichWithFavorites,
    filterBySearch,
    normalizePokemon,
};
