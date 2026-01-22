import { API_CONFIG } from "@/services/api/config";
import httpClient from "@/lib/httpClient";

/**
 * @module pokemonApi
 * @description
 * Este módulo actúa como una capa de servicio (o repositorio) que centraliza toda la comunicación
 * con la API de Pokémon. Abstrae los endpoints, las peticiones HTTP y la transformación de datos,
 * proveyendo una API limpia para el resto de la aplicación.
 *
 * **Responsabilidades:**
 * 1. **Abstracción HTTP:** Gestiona las peticiones y respuestas HTTP usando `httpClient`.
 * 2. **Transformación de Datos:** Convierte los datos crudos de la API en objetos de dominio simplificados.
 *
 * **Efectos Secundarios:**
 * - Realiza peticiones de red externas a la PokéAPI.
 */

/**
 * Transforma los datos crudos de un Pokémon desde la API a un formato de dominio simplificado.
 * @private
 * @param {object} data - Respuesta cruda de la API para un Pokémon.
 * @returns {{id: number, name: string, types: any[], sprites: any}} Objeto Pokémon con la estructura de datos que usa la app.
 */
const transformPokemonData = (data) => ({
    id: data.id,
    name: data.name,
    types: data.types,
    sprites: data.sprites,
});

/**
 * @namespace pokemonApi
 * @summary Objeto que agrupa los métodos para interactuar con los endpoints de Pokémon.
 */
export const pokemonApi = {
    /**
     * @NOTA_ARQUITECTONICA (Cuello de Botella de Rendimiento - Problema N+1)
     *
     * Esta función actualmente sufre del problema de "N+1" peticiones. Primero hace
     * 1 petición para obtener la lista de Pokémon, y luego hace N peticiones adicionales (una por cada
     * Pokémon) para obtener sus detalles individuales. Esta es una limitación de la API pública subyacente.
     *
     * @SOLUCION_IDEAL
     * La mejor solución sería tener un endpoint de backend dedicado que devuelva la lista
     * de Pokémon con todos los detalles en una sola respuesta, reduciendo las N+1 peticiones a solo 1.
     */
    /**
     * @async
     * @function getPokemons
     * @memberof pokemonApi
     * @description Obtiene una lista paginada de Pokémon con sus detalles completos.
     *
     * **Responsabilidades:**
     * 1. Solicita la lista base de Pokémon (paginada).
     * 2. Realiza peticiones paralelas para obtener los detalles de cada Pokémon.
     * 3. Transforma y agrega los resultados.
     *
     * **Efectos Secundarios:**
     * - Realiza múltiples peticiones HTTP GET a la API externa.
     *
     * @param {number} [offset=0] - El número de Pokémon a saltar, para la paginación.
     * @param {number} [limit=API_CONFIG.DEFAULT_PARAMS.LIMIT] - El número máximo de Pokémon a devolver.
     * @returns {Promise<{count: number, results: Array<object>}>} Un objeto con el conteo total y la lista de Pokémon.
     * @throws {Error} Si la petición a la API falla.
     */
    getPokemons: async (
        offset = 0,
        limit = API_CONFIG.DEFAULT_PARAMS.LIMIT,
    ) => {
        // 1. Obtener la lista base de Pokémon (solo contiene nombre y URL)
        const { data: listData } = await httpClient.get(
            API_CONFIG.ENDPOINTS.POKEMON,
            {
                params: { offset, limit },
            },
        );

        // 2. Crear un array de promesas, donde cada promesa es una petición para los detalles de un Pokémon.
        const detailPromises = listData.results.map((pokemon) =>
            httpClient.get(pokemon.url),
        );

        // 3. Esperar a que todas las peticiones de detalle se completen en paralelo.
        const detailResponses = await Promise.all(detailPromises);

        // 4. Transformar los datos de cada respuesta exitosa.
        const results = detailResponses.map((response) =>
            transformPokemonData(response.data),
        );

        return { count: listData.count, results };
    },

    /**
     * @todo Implementar el uso de esta función en una página de detalles de Pokémon.
     * @async
     * @function getPokemonDetails
     * @memberof pokemonApi
     * @description Obtiene los detalles de un único Pokémon por su ID o nombre.
     * @param {string|number} idOrName - El ID (número) o el nombre (string) del Pokémon a buscar.
     * @returns {Promise<object>} Un objeto con el detalle transformado del Pokémon.
     * @throws {Error} Si la petición a la API falla.
     */
    getPokemonDetails: async (idOrName) => {
        const { data } = await httpClient.get(
            `${API_CONFIG.ENDPOINTS.POKEMON}/${idOrName}`,
        );
        return transformPokemonData(data);
    },
};
