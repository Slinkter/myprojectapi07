import axios from "axios";
import { API_CONFIG } from "@/services/api/config";

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
});

export const getPokemonList = async (
    offset = 0,
    limit = API_CONFIG.DEFAULT_PARAMS.LIMIT
) => {
    try {
        const { data } = await api.get(
            `${API_CONFIG.ENDPOINTS.POKEMON}?offset=${offset}&limit=${limit}`
        );
        
        // Fetch details for each pokemon in parallel
        const detailedPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const { data: details } = await api.get(pokemon.url);
                return {
                    id: details.id,
                    name: details.name,
                    types: details.types,
                    sprites: details.sprites,
                    // favorite: false, // This will be added in App.jsx based on favoritesSlice
                };
            })
        );

        return { count: data.count, results: detailedPokemons };
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
        throw error;
    }
};

export const getPokemonById = async (id) => {
    try {
        const { data } = await api.get(`${API_CONFIG.ENDPOINTS.POKEMON}/${id}`);
        return {
            id: data.id,
            name: data.name,
            types: data.types,
            sprites: data.sprites,
            // favorite: false, // This will be added in App.jsx based on favoritesSlice
        };
    } catch (error) {
        console.error(`Error fetching Pokemon with id ${id}:`, error);
        throw error;
    }
};