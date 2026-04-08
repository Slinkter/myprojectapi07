/**
 * @module domainTypes
 * @description Define las interfaces de dominio para la aplicación Pokédex.
 * Estas definiciones actúan como la única fuente de verdad para el tipado de datos.
 */

/**
 * @typedef {object} PokemonSprite
 * @property {string} front_default - URL del sprite frontal defecto.
 * @property {string} back_default - URL del sprite trasero defecto.
 * @property {object} other - Otros sprites (oficial artwork, etc).
 */

/**
 * @typedef {object} PokemonType
 * @property {string} name - Nombre del tipo (ej. 'fire', 'water').
 * @property {string} url - URL de detalle del tipo.
 */

/**
 * @typedef {object} Pokemon
 * @property {number} id - ID nacional del Pokémon.
 * @property {string} name - Nombre del Pokémon.
 * @property {PokemonSprite} sprites - Objeto con las URLs de los sprites.
 * @property {PokemonType[]} types - Lista de tipos del Pokémon.
 * @property {boolean} [favorite] - Propiedad derivada (añadida por selectores).
 */

/**
 * @typedef {object} PokemonApiResponse
 * @property {number} count - Total de Pokémon disponibles en la API.
 * @property {Array<{name: string, url: string}>} results - Lista básica de Pokémon.
 */

export {};
