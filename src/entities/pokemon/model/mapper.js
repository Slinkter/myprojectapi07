/**
 * @module pokemonMapper
 * @description
 * Patrón Mapper: Transforma la respuesta de la infraestructura (API)
 * a la estructura de datos del dominio (Entidad).
 */

import { normalizePokemon } from "./utils";
import { INVALID_POKEMON_FALLBACK } from "@/utils/constants";

/**
 * Mapea la respuesta de la API a la entidad de dominio.
 * @param {object} apiData - Datos crudos provenientes de la API.
 * @returns {object} Entidad Pokemon o fallback si los datos son inválidos.
 */
export const mapToPokemonEntity = (apiData) => {
    if (!apiData || !apiData.id) {
        return INVALID_POKEMON_FALLBACK;
    }
    return normalizePokemon(apiData);
};

/**
 * Mapea una lista de respuestas de la API a entidades de dominio.
 * @param {Array} apiList - Lista de datos crudos.
 * @returns {Array} Lista de entidades Pokemon.
 */
export const mapToPokemonList = (apiList) => {
    if (!apiList || !Array.isArray(apiList)) return [];
    return apiList.map(mapToPokemonEntity);
};

export default {
    mapToPokemonEntity,
    mapToPokemonList,
};
