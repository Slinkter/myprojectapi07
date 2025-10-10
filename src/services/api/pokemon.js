import axios from "axios";
import { API_CONFIG } from "./config";

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
});

export const getPokemonList = async (
    limit = API_CONFIG.DEFAULT_PARAMS.LIMIT
) => {
    try {
        const { data } = await api.get(
            `${API_CONFIG.ENDPOINTS.POKEMON}?limit=${limit}`
        );
        return Promise.all(
            data.results.map(async (pokemon) => {
                const { data: details } = await api.get(pokemon.url);
                return {
                    id: details.id,
                    name: details.name,
                    types: details.types,
                    sprites: details.sprites,
                    favorite: false,
                };
            })
        );
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
            favorite: false,
        };
    } catch (error) {
        console.error(`Error fetching Pokemon with id ${id}:`, error);
        throw error;
    }
};
