import { API_CONFIG } from "@/services/api/config";
import httpClient from "@/lib/httpClient";
import { POKEMON_SEED } from "@/entities/pokemon/data/seed";
import { logger } from "@/lib/logger";

const STORAGE_KEY = "pokemon_cache";
const CACHE_TTL = 1000 * 60 * 15;
const MAX_CACHE_SIZE = 50;

const memoryCache = new Map();

// Throttle localStorage persist to avoid serializing entire cache on every write
const throttleSave = (() => {
    let timeout = null;
    let pendingCache = null;
    return (cache) => {
        pendingCache = cache;
        if (timeout) return;
        timeout = setTimeout(() => {
            if (pendingCache) saveCacheToStorage(pendingCache);
            pendingCache = null;
            timeout = null;
        }, 2000);
    };
})();

/**
 * @function createSeedLookup
 * @description Crea Maps para O(1) lookup por ID y nombre.
 * Big O Optimization: O(n) → O(1) por búsqueda
 */
const createSeedLookup = () => {
    const idLookup = new Map();
    const nameLookup = new Map();
    POKEMON_SEED.forEach(p => {
        idLookup.set(p.id, p);
        nameLookup.set(p.name.toLowerCase(), p);
    });
    return { idLookup, nameLookup };
};

const { idLookup: SEED_ID_LOOKUP, nameLookup: SEED_NAME_LOOKUP } = createSeedLookup();

const getCacheFromStorage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return new Map();
        const parsed = JSON.parse(stored);
        const now = Date.now();
        const valid = new Map();
        for (const [key, value] of Object.entries(parsed)) {
            if (value?.timestamp && now - value.timestamp < CACHE_TTL) {
                valid.set(key, value.data);
            }
        }
        return valid;
    } catch /* empty */ {
        return new Map();
    }
};

const saveCacheToStorage = (cache) => {
    try {
        const obj = {};
        cache.forEach((value, key) => {
            obj[key] = { data: value, timestamp: Date.now() };
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch /* empty */ {
        /* empty */
    }
};

const extractIdFromUrl = (url) => {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]) || 0;
};

/**
 * @function findInSeed
 * @description Busca en seed data usando Maps O(1)
 * Big O: ANTES O(n) → DESPUÉS O(1)
 */
const findInSeed = (idOrName) => {
    const id = Number(idOrName);
    if (!Number.isNaN(id) && id > 0) {
        return SEED_ID_LOOKUP.get(id);  // O(1) lookup por ID
    }
    const nameLower = String(idOrName).toLowerCase();
    return SEED_NAME_LOOKUP.get(nameLower);  // O(1) lookup por nombre
};

const getCache = (key) => {
    if (memoryCache.has(key)) {
        return memoryCache.get(key);
    }
    const storageCache = getCacheFromStorage();
    if (storageCache.has(key)) {
        memoryCache.set(key, storageCache.get(key));
        return storageCache.get(key);
    }
    return null;
};

const setCache = (key, data) => {
    memoryCache.set(key, data);

    // LRU eviction: if cache exceeds MAX_CACHE_SIZE, delete oldest entry
    if (memoryCache.size > MAX_CACHE_SIZE) {
        const oldestKey = memoryCache.keys().next().value;
        memoryCache.delete(oldestKey);
    }

    const storageCache = getCacheFromStorage();
    storageCache.set(key, data);
    throttleSave(storageCache);
};

const extractSimpleTypes = (types) => {
    if (!types) return [];
    if (!Array.isArray(types)) return [];
    return types
        .map(t => (typeof t === "string" ? t : t.type?.name))
        .filter(Boolean);
};

const transformPokemonData = (data) => {
    if (!data) {
        return { id: 0, name: "Unknown", types: [], sprites: {}, stats: [] };
    }
    const id = Number(data.id);
    if (Number.isNaN(id) || id === 0) {
        return { id: 0, name: "Unknown", types: [], sprites: {}, stats: [] };
    }
    return {
        id,
        name: String(data.name || "Unknown").toLowerCase(),
        types: extractSimpleTypes(data.types),
        sprites: data.sprites || {},
        stats: Array.isArray(data.stats) ? data.stats : [],
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
                    const extractedId = extractIdFromUrl(pokemon.url);

                    const cacheKey = `pokemon:${extractedId}`;
                    const cached = getCache(cacheKey);
                    if (cached) {
                        logger.flow("CacheHit", { id: extractedId });
                        return cached;
                    }

                    const seedPokemon = SEED_ID_LOOKUP.get(extractedId);
                    if (seedPokemon) {
                        logger.flow("SeedMatch", { id: extractedId });
                        return transformPokemonData(seedPokemon);
                    }

                    const { data } = await httpClient.get(pokemon.url);
                    const transformed = transformPokemonData(data);
                    setCache(cacheKey, transformed);
                    return transformed;
                })
            );

            const duration = performance.now() - startTime;
            logger.api(API_CONFIG.ENDPOINTS.POKEMON, "SUCCESS", duration);
            return { count: listData.count, results };
        } catch (error) {
            logger.api(API_CONFIG.ENDPOINTS.POKEMON, "ERROR", 0);
            logger.error("API Error fetching pokemons", error?.message || error);
            return { count: 0, results: [] };
        }
    },

    getPokemonDetails: async (idOrName) => {
        const startTime = performance.now();
        const url = `${API_CONFIG.ENDPOINTS.POKEMON}/${idOrName}`;

        const cacheKey = `pokemon:${idOrName}`;
        const cached = getCache(cacheKey);
        if (cached) {
            logger.flow("CacheHit", { id: idOrName });
            return cached;
        }

        const seedPokemon = findInSeed(idOrName);
        if (seedPokemon) {
            logger.flow("SeedHit", { id: idOrName });
            return transformPokemonData(seedPokemon);
        }

        try {
            const { data } = await httpClient.get(url);
            const transformed = transformPokemonData(data);
            setCache(cacheKey, transformed);
            const duration = performance.now() - startTime;
            logger.api(url, "SUCCESS", duration);
            return transformed;
        } catch (error) {
            logger.api(url, "ERROR", 0);
            logger.error("API Error fetching pokemon details", error?.message || error);
            return {
                id: 0,
                name: "Unknown",
                types: [],
                sprites: {},
                stats: [],
            };
        }
    },

    clearCache: () => {
        memoryCache.clear();
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch /* empty */ {
            // Ignore storage errors
        }
    },
};