/**
 * Configuración `API_CONFIG`.
 *
 * **Responsabilidad:**
 * * Almacena constantes globales inmutables para la comunicación con APIs externas.
 * * Previene "magic strings" dispersos por el código (URL hardcodeadas).
 *
 * **Motivo de existencia:**
 * * Facilita el mantenimiento: si la URL de la API cambia, solo se edita aquí.
 *
 * **Relación con otros módulos:**
 * * Importado por: `httpClient` (Base URL), `pokemonApi` (Endpoints).
 *
 * @namespace API_CONFIG
 */
export const API_CONFIG = {
    /** ULR Base de la PokéAPI v2 (Sin trailing slash). */
    BASE_URL: "https://pokeapi.co/api/v2",

    /**
     * Mapa de endpoints relativos.
     * Uso: `BASE_URL + ENDPOINTS.POKEMON`
     */
    ENDPOINTS: {
        POKEMON: "/pokemon",
    },

    /** Configuración por defecto para paginación y límites. */
    DEFAULT_PARAMS: {
        LIMIT: 20,
    },
};
