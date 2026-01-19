import httpClient from "@/lib/httpClient";
import { API_CONFIG } from "@/services/api/config";

/**
 * Módulo `pokemonApi`.
 *
 * **Responsabilidad:**
 * * Centraliza todas las llamadas de red relacionadas con la entidad Pokémon.
 * * Abstrae los endpoints específicos de la API y sus transformaciones de datos.
 */
const transformPokemonData = (data) => ({
  id: data.id,
  name: data.name,
  types: data.types,
  sprites: data.sprites,
});

export const pokemonApi = {
  /**
   * @ARCHITECTURAL_NOTE (Performance Bottleneck - N+1 Problem)
   *
   * This function currently suffers from the "N+1" request problem. It first makes
   * 1 request to get the list of Pokémon, and then makes N additional requests (one for each
   * Pokémon) to fetch their individual details. This is a limitation of the underlying public API.
   *
   * @IDEAL_SOLUTION
   * The best solution would be a dedicated backend endpoint that returns the list
   * of Pokémon with all details in a single response, reducing N+1 requests to 1.
   */
  getPokemons: async (offset = 0, limit = API_CONFIG.DEFAULT_PARAMS.LIMIT) => {
    // 1. Fetch the base list of Pokémon (which only contains name and URL)
    const { data: listData } = await httpClient.get(
      API_CONFIG.ENDPOINTS.POKEMON,
      {
        params: { offset, limit },
      },
    );

    // 2. Create an array of promises, where each promise is a request for a single Pokémon's details.
    const detailPromises = listData.results.map((pokemon) =>
      httpClient.get(pokemon.url),
    );

    // 3. Wait for all detail requests to complete in parallel.
    const detailResponses = await Promise.all(detailPromises);

    // 4. Transform the data from each successful response.
    const results = detailResponses.map((response) =>
      transformPokemonData(response.data),
    );

    return { count: listData.count, results };
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

