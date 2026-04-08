import { API_CONFIG } from "@/services/api/config";
import httpClient from "@/lib/httpClient";
import { POKEMON_SEED } from "@/entities/pokemon/model/seed";
import { logger } from "@/lib/logger";

/**
 * @module pokemonApi
 * @description Capa de servicio optimizada para comunicación con la PokéAPI.
 * No依赖 Zod - Usa validación manual Simple (Zod-Lite Pattern).
 */

const pokemonCache = new Map();

/**
 * Transformación manual de datos - Sin librerías externas.
 * Garantiza coerción de tipos para evitar el bug de favoritos.
 */
const transformPokemonData = (data) => {
    if (!data || !data.id) {
        return { id: 0, name: "Unknown", types: [], sprites: {} };
    }
    // Forzamos la coerción a número: ¡Aquí está la magia que evita el bug!
    return {
        id: Number(data.id),
        name: String(data.name || "Unknown"),
        types: Array.isArray(data.types) ? data.types : [],
        sprites: data.sprites || {},
    };
};

export const pokemonApi = {
    getPokemons: async (offset = 0, limit = API_CONFIG.DEFAULT_PARAMS.LIMIT) => {
        const startTime = performance.now();
        logger.flow("FetchPokemons", { offset, limit });

        try {
            const { data: listData } = await httpClient.get(
                API_CONFIG.ENDPOINTS.POKEMON,
                { params: { offset, limit } },
            );

            const results = await Promise.all(
                listData.results.map(async (pokemon) => {
                    // 1. Memory Cache
                    if (pokemonCache.has(pokemon.url)) {
                        return pokemonCache.get(pokemon.url);
                    }

                    // 2. Local Seed Data (Offline-First)
                    const extractedId = Number(pokemon.url.split('/').filter(Boolean).pop());
                    const seedPokemon = POKEMON_SEED.find(p => p.id === extractedId);
                    if (seedPokemon) {
                        logger.flow("SeedMatch", { id: seedPokemon.id });
                        return seedPokemon;
                    }

                    // 3. Remote API
                    const { data } = await httpClient.get(pokemon.url);
                    const transformed = transformPokemonData(data);
                    pokemonCache.set(pokemon.url, transformed);
                    return transformed;
                })
            );

            const duration = performance.now() - startTime;
            logger.api(API_CONFIG.ENDPOINTS.POKEMON, "SUCCESS", duration);
            return { count: listData.count, results };
        } catch (error) {
            logger.api(API_CONFIG.ENDPOINTS.POKEMON, "ERROR", 0);
            console.error("SDR-01: API Error", error);
            return { count: 0, results: [] };
        }
    },

    getPokemonDetails: async (idOrName) => {
        const startTime = performance.now();
        const url = `${API_CONFIG.ENDPOINTS.POKEMON}/${idOrName}`;
        
        if (pokemonCache.has(url)) {
            logger.flow("CacheHit", { id: idOrName });
            return pokemonCache.get(url);
        }

        // Check Seed
        const seedPokemon = POKEMON_SEED.find(p => p.id === Number(idOrName));
        if (seedPokemon) {
            logger.flow("SeedHit", { id: idOrName });
            return seedPokemon;
        }

        try {
            const { data } = await httpClient.get(url);
            const transformed = transformPokemonData(data);
            pokemonCache.set(url, transformed);
            const duration = performance.now() - startTime;
            logger.api(url, "SUCCESS", duration);
            return transformed;
        } catch (error) {
            logger.api(url, "ERROR", 0);
            console.error("SDR-01: Detail Error", error);
            return { 
                id: `error-${idOrName}-${Date.now()}`,
                name: "Unknown", 
                types: [], 
                sprites: {} 
            };
        }
    },

    clearCache: () => pokemonCache.clear(),
};