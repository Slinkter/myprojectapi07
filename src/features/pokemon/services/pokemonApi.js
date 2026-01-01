import axios from "axios";
import { API_CONFIG } from "@/services/api/config";

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
});

/**
 * Transforms the raw Pokémon data from the API into a standardized format.
 * @param {object} data - The raw Pokémon data from the API.
 * @returns {{id: number, name: string, types: Array<object>, sprites: object}} The transformed Pokémon data.
 */
const transformPokemonData = (data) => ({
    id: data.id,
    name: data.name,
    types: data.types,
    sprites: data.sprites,
});

/**
 * Fetches detailed information for a single Pokémon from its API URL.
 * @param {string} url - The URL to fetch the Pokémon details from.
 * @returns {Promise<object>} A promise that resolves to the transformed Pokémon data.
 */
const fetchPokemonDetailByUrl = async (url) => {
    const { data } = await axios.get(url);
    return transformPokemonData(data);
};

/**
 * Fetches a paginated list of Pokémon with their detailed information.
 * @param {number} [offset=0] - The offset to start fetching from.
 * @param {number} [limit=API_CONFIG.DEFAULT_PARAMS.LIMIT] - The number of Pokémon to fetch.
 * @returns {Promise<{count: number, results: Array<object>}>} A promise that resolves to an object containing the total count and the list of Pokémon.
 */
export const getPokemonList = async (
    offset = 0,
    limit = API_CONFIG.DEFAULT_PARAMS.LIMIT
) => {
    try {
        const url = `${API_CONFIG.ENDPOINTS.POKEMON}?offset=${offset}&limit=${limit}`;
        const { data } = await api.get(url);

        // Fetch details for each pokemon in parallel
        const detailedPokemons = await Promise.all(
            data.results.map((pokemon) => fetchPokemonDetailByUrl(pokemon.url))
        );

        return { count: data.count, results: detailedPokemons };
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
        throw error;
    }
};

/**
 * Fetches a single Pokémon by its ID.
 * @param {number} id - The ID of the Pokémon to fetch.
 * @returns {Promise<object>} A promise that resolves to the transformed Pokémon data.
 */
export const getPokemonById = async (id) => {
    try {
        const { data } = await api.get(`${API_CONFIG.ENDPOINTS.POKEMON}/${id}`);
        return transformPokemonData(data);
    } catch (error) {
        console.error(`Error fetching Pokemon with id ${id}:`, error);
        throw error;
    }
};
