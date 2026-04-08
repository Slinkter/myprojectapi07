import { API_CONFIG } from "@/services/api/config";
import httpClient from "@/lib/httpClient";

/**
 * @module pokemonApi
 * @description Capa de servicio optimizada para la comunicación con la PokéAPI.
 * Implementa un patrón de Repositorio con Caché en Memoria y normalización estricta de tipos.
 */

const pokemonCache = new Map();

/**
 * Transforma y normaliza los datos crudos de la API.
 * Garantiza la coerción de tipos para evitar errores de sincronización con favoritos.
 * @private
 * @param {object} data - Respuesta cruda de la API.
 * @returns {import("@/lib/domainTypes").Pokemon}
 */
const transformPokemonData = (data) => ({
    id: Number(data.id), // Coerción obligatoria para solucionar bug de favoritos
    name: String(data.name || "Unknown"),
    types: Array.isArray(data.types) ? data.types : [],
    sprites: data.sprites || {},
});

export const pokemonApi = {
    getPokemons: async (
        offset = 0,
        limit = API_CONFIG.DEFAULT_PARAMS.LIMIT,
    ) => {
        const { data: listData } = await httpClient.get(
            API_CONFIG.ENDPOINTS.POKEMON,
            { params: { offset, limit } },
        );

        const results = await Promise.all(
            listData.results.map(async (pokemon) => {
                if (pokemonCache.has(pokemon.url)) {
                    return pokemonCache.get(pokemon.url);
                }

                try {
                    const { data } = await httpClient.get(pokemon.url);
                    const transformed = transformPokemonData(data);
                    pokemonCache.set(pokemon.url, transformed);
                    return transformed;
                } catch (error) {
                    console.error(`SDR-01: Fetch Error for ${pokemon.name}`, error);
                    return { id: 0, name: "Unknown", types: [], sprites: {} };
                }
            }),
        );

        return { count: listData.count, results };
    },

    getPokemonDetails: async (idOrName) => {
        const url = `${API_CONFIG.ENDPOINTS.POKEMON}/${idOrName}`;
        if (pokemonCache.has(url)) return pokemonCache.get(url);

        const { data } = await httpClient.get(url);
        const transformed = transformPokemonData(data);
        pokemonCache.set(url, transformed);
        return transformed;
    },

    clearCache: () => {
        pokemonCache.clear();
    }
};
