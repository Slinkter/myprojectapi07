import httpClient from "@/lib/httpClient";
import { API_CONFIG } from "@/services/api/config";

/**
 * Módulo `pokemonApi`.
 *
 * **Responsabilidad:**
 * * Centraliza todas las llamadas de red relacionadas con la entidad Pokémon.
 * * Abstrae los endpoints específicos de la API y sus transformaciones de datos.
 *
 * **Motivo de existencia:**
 * * Desacopla la lógica de fetching (Axios) de la lógica de negocio (Redux/Componentes).
 * * Permite cambiar la fuente de datos o la librería HTTP en un solo lugar.
 *
 * **Relación con otros módulos:**
 * * Es consumido por: `pokemonSlice` (Redux Thunks).
 * * Depende de: `httpClient` (Configuración Axios) y `API_CONFIG`.
 */

/**
 * Transforma los datos crudos de la API a un formato de dominio simplificado.
 *
 * @param {object} data - Respuesta cruda de la API.
 * @returns {object} Objeto Pokémon limpio con id, nombre, tipos y sprites.
 */
const transformPokemonData = (data) => ({
    id: data.id,
    name: data.name,
    types: data.types,
    sprites: data.sprites,
});

/**
 * Obtiene detalles de un Pokémon dado su URL absoluta.
 *
 * **Flujo:**
 * 1. Realiza GET a la URL proporcionada.
 * 2. Transforma la respuesta.
 *
 * @param {string} url - URL completa del recurso Pokémon.
 * @returns {Promise<object>} Datos transformados.
 */
const fetchPokemonDetailByUrl = async (url) => {
    // REFACTOR: Usar httpClient.get en lugar de axios.get directo para mantener interceptores.
    // Nota: Como la URL es absoluta, axios la respeta sobre baseURL.
    const { data } = await httpClient.get(url);
    return transformPokemonData(data);
};

export const pokemonApi = {
    /**
     * Obtiene una lista paginada de Pokémon con detalles completos.
     *
     * **Flujo de interacción:**
     * 1. Solicita la lista base (nombres y urls) al endpoint `/pokemon`.
     * 2. Itera sobre los resultados y realiza peticiones paralelas (`Promise.all`) para obtener detalles (imágenes, tipos).
     * 3. Retorna la estructura combinada para que la UI no tenga que hacer waterfalls.
     *
     * @param {number} [offset=0] - Desplazamiento para paginación.
     * @param {number} [limit=20] - Cantidad de items a recuperar.
     * @returns {Promise<{count: number, results: Array<object>}>} Total de registros y lista detallada.
     */
    getPokemons: async (
        offset = 0,
        limit = API_CONFIG.DEFAULT_PARAMS.LIMIT,
    ) => {
        const { data } = await httpClient.get(API_CONFIG.ENDPOINTS.POKEMON, {
            params: { offset, limit },
        });

        // Optimización: Fetch paralelo de detalles
        const results = await Promise.all(
            data.results.map((pokemon) => fetchPokemonDetailByUrl(pokemon.url)),
        );

        return { count: data.count, results };
    },

    /**
     * Obtiene detalles de un Pokémon específico por ID o Nombre.
     *
     * @param {string|number} idOrName - Identificador.
     * @returns {Promise<object>} Detalle transformado.
     */
    getPokemonDetails: async (idOrName) => {
        const { data } = await httpClient.get(
            `${API_CONFIG.ENDPOINTS.POKEMON}/${idOrName}`,
        );
        return transformPokemonData(data);
    },
};
