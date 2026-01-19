/**
 * @module apiConfig
 * @description
 * Este módulo centraliza todas las constantes de configuración para la comunicación con APIs externas.
 * Su propósito es desacoplar la configuración de la API del código de la aplicación,
 * facilitando el mantenimiento y los cambios de entorno.
 */

/**
 * @constant {object} API_CONFIG
 * @summary Agrupa todas las constantes de configuración de la API.
 * @description Almacena valores globales e inmutables como la URL base, los endpoints
 * y los parámetros por defecto. Este objeto debe ser tratado como inmutable.
 * @readonly
 * @namespace API_CONFIG
 */
export const API_CONFIG = {
  /**
   * La URL base de la PokéAPI v2. No debe tener una barra al final.
   * @type {string}
   */
  BASE_URL: "https://pokeapi.co/api/v2",

  /**
   * @property {object} ENDPOINTS - Mapa de endpoints relativos a la BASE_URL.
   * @property {string} ENDPOINTS.POKEMON - Endpoint para los recursos de Pokémon.
   */
  ENDPOINTS: {
    POKEMON: "/pokemon",
  },

  /**
   * @property {object} DEFAULT_PARAMS - Parámetros por defecto para las peticiones.
   * @property {number} DEFAULT_PARAMS.LIMIT - El número de resultados por defecto en peticiones paginadas.
   */
  DEFAULT_PARAMS: {
    LIMIT: 20,
  },
};
