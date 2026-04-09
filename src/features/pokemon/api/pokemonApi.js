import { API_CONFIG } from "@/services/api/config";
import httpClient from "@/lib/httpClient";
import { POKEMON_SEED } from "@/entities/pokemon/data/seed";
import { logger } from "@/lib/logger";

const STORAGE_KEY = "pokemon_cache";
const CACHE_TTL = 1000 * 60 * 15;

const memoryCache = new Map();

const createSeedLookup = () => {
    const lookup = new Map();
    POKEMON_SEED.forEach(p => lookup.set(p.id, p));
    return lookup;
};

const SEED_LOOKUP = createSeedLookup();

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

const findInSeed = (idOrName) => {
    const id = Number(idOrName);
    if (!Number.isNaN(id)) {
        return SEED_LOOKUP.get(id);
    }
    return POKEMON_SEED.find(p => p.name === String(idOrName).toLowerCase());
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
    const storageCache = getCacheFromStorage();
    storageCache.set(key, data);
    saveCacheToStorage(storageCache);
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

                    const seedPokemon = SEED_LOOKUP.get(extractedId);
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
            console.error("SDR-01: API Error", error);
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
            console.error("SDR-01: Detail Error", error);
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