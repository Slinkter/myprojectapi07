/**
 * @module pokemonMapper
 * @description
 * Patrón Mapper: Transforma la estructura de datos de la infraestructura (API) 
 * a la estructura de datos del dominio (Entidad).
 * 
 * Esto garantiza que la aplicación no dependa de los nombres de campos de la API externa.
 */

import { normalizePokemon } from "./utils";

/**
 * Mapea la respuesta de la API a la entidad de dominio.
 * @param {object} apiData - Datos crudos provenientes de la API.
 * @returns {import("@/lib/domainTypes").Pokemon}
 */
export const mapToPokemonEntity = (apiData) => {
    // Validamos que existan datos básicos antes de mapear
    if (!apiData || !apiData.id) {
        return {
            id: 0,
            name: "Unknown",
            types: [],
            sprites: {},
        };
    }

    return normalizePokemon(apiData);
};

/**
 * Mapea una lista de respuestas de la API a entidades de dominio.
 * @param {Array} apiList - Lista de datos crudos.
 * @returns {Array<import("@/lib/domainTypes").Pokemon>}
 */
export const mapToPokemonList = (apiList) => {
    return apiList.map(mapToPokemonEntity);
};

export default {
    mapToPokemonEntity,
    mapToPokemonList,
};
