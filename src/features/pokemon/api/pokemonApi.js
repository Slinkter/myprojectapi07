import axios from "axios";
import { API_CONFIG } from "@/services/api/config";
import httpClient from "@/lib/httpClient";


/**
 * Transforms the raw Pokémon data from the API into a standardized format.
 * @param {object} data - The raw Pokémon data from the API.
 * @returns {object} The transformed Pokémon data.
 */
const transformPokemonData = (data) => ({
    id: data.id,
    name: data.name,
    types: data.types,
    sprites: data.sprites,
});

/**
 * Fetches detailed information for a single Pokémon from its API URL.
 */
const fetchPokemonDetailByUrl = async (url) => {
    const { data } = await axios.get(url);
    return transformPokemonData(data);
};

/**
 * Service for fetching Pokémon data from the PokéAPI.
 */
export const pokemonApi = {
    /**
     * Fetches a paginated list of Pokémon with their detailed information.
     * @param {number} offset - The offset to start fetching from.
     * @param {number} limit - The number of Pokémon to fetch.
     * @returns {Promise<Object>} Object containing total count and results.
     */
    getPokemons: async (offset = 0, limit = API_CONFIG.DEFAULT_PARAMS.LIMIT) => {
        const { data } = await httpClient.get(API_CONFIG.ENDPOINTS.POKEMON, {
            params: { offset, limit },
        });

        // Fetch details for each pokemon in parallel
        const results = await Promise.all(
            data.results.map((pokemon) => fetchPokemonDetailByUrl(pokemon.url))
        );

        return { count: data.count, results };
    },

    /**
     * Fetches detailed data for a specific Pokémon by ID or name.
     * @param {string|number} idOrName - Pokémon ID or name.
     * @returns {Promise<Object>} Detailed Pokémon data.
     */
    getPokemonDetails: async (idOrName) => {
        const { data } = await httpClient.get(`${API_CONFIG.ENDPOINTS.POKEMON}/${idOrName}`);
        return transformPokemonData(data);
    },
};
