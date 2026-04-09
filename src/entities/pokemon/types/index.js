/**
 * @module pokemon/types
 * @description Tipos TypeScript para la entidad Pokemon.
 */

/**
 * @typedef {object} PokemonSprite
 * @property {string} [front_default] - URL del sprite frontal.
 * @property {string} [back_default] - URL del sprite trasero.
 * @property {object} [other] - Otros sprites.
 * @property {object} [other.official-artwork] - Sprite artwork oficial.
 */

/**
 * @typedef {object} PokemonType
 * @property {number} slot - Slot del tipo.
 * @property {object} type - Información del tipo.
 * @property {string} type.name - Nombre del tipo.
 * @property {string} type.url - URL del tipo.
 */

/**
 * @typedef {object} PokemonStat
 * @property {number} base_stat - Valor base de la estadística.
 * @property {number} effort - Esfuerzo.
 * @property {object} stat - Información de la estadística.
 * @property {string} stat.name - Nombre de la estadística.
 * @property {string} stat.url - URL de la estadística.
 */

/**
 * @typedef {object} Pokemon
 * @property {number} id - ID nacional del Pokémon.
 * @property {string} name - Nombre del Pokémon.
 * @property {PokemonSprite} sprites - Sprites del Pokémon.
 * @property {PokemonType[]} types - Tipos del Pokémon.
 * @property {PokemonStat[]} stats - Estadísticas del Pokémon.
 * @property {boolean} [isFavorite] - Si el Pokémon es favorito.
 */

/**
 * @typedef {object} PokemonListItem
 * @property {string} name - Nombre del Pokémon.
 * @property {string} url - URL del detalle del Pokémon.
 */

/**
 * @typedef {object} PokemonListResponse
 * @property {number} count - Total de Pokémon.
 * @property {string} next - URL de la siguiente página.
 * @property {string} previous - URL de la página anterior.
 * @property {PokemonListItem[]} results - Lista de Pokémon.
 */

/**
 * @typedef {object} PokemonQueryParams
 * @property {number} [offset] - Offset para paginación.
 * @property {number} [limit] - Límite de resultados.
 */

export {};