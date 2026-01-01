/**
 * API_CONFIG provides a centralized place for managing API-related constants
 * throughout the application, such as the base URL, API endpoints, and default parameters.
 * This approach enhances maintainability and consistency for API interactions.
 * @namespace API_CONFIG
 */
export const API_CONFIG = {
    /**
     * The base URL for the Pokémon API.
     * @memberof API_CONFIG
     * @type {string}
     */
    BASE_URL: "https://pokeapi.co/api/v2",
    /**
     * API endpoints used in the application.
     * @memberof API_CONFIG
     * @property {string} POKEMON - The endpoint for Pokémon-related data.
     */
    ENDPOINTS: {
        POKEMON: "/pokemon",
    },
    /**
     * Default parameters for API requests.
     * @memberof API_CONFIG
     * @property {number} LIMIT - The default limit for fetching data.
     */
    DEFAULT_PARAMS: {
        LIMIT: 20,
    },
};
