/**
 * @module constants
 * @description
 * Este módulo exporta constantes centralizadas para ser utilizadas en toda la aplicación.
 * El propósito es evitar "números mágicos" y strings duplicadas en el código,
 * mejorando la mantenibilidad y la consistencia.
 *
 * **Responsabilidades:**
 * 1.  Definir valores inmutables compartidos.
 *
 * **Efectos Secundarios:**
 * - No tiene efectos secundarios.
 */

/**
 * @constant {object} UI_CONSTANTS
 * @summary Agrupa constantes relacionadas con la interfaz de usuario.
 * @description Proporciona un lugar único para gestionar valores estáticos como límites de paginación,
 * conteo de skeletons y duraciones de animación. Este objeto debe ser tratado como inmutable.
 * @readonly
 * @namespace UI_CONSTANTS
 */

/**
 * Constantes relacionadas con la cuadrícula de visualización de Pokémon.
 * @memberof UI_CONSTANTS
 * @property {number} ITEMS_PER_PAGE - El número de Pokémon a mostrar por página en la cuadrícula.
 * @property {number} SKELETON_COUNT - El número de cargadores skeleton a mostrar mientras se cargan los Pokémon.
 */
/**
 * Constantes relacionadas con las animaciones.
 * @memberof UI_CONSTANTS
 * @property {object} DURATION - Diferentes duraciones para las animaciones.
 * @property {number} DURATION.FAST - Duración de animación rápida en milisegundos.
 * @property {number} DURATION.NORMAL - Duración de animación normal en milisegundos.
 * @property {number} DURATION.SLOW - Duración de animación lenta en milisegundos.
 */
export const UI_CONSTANTS = {
    POKEMON_GRID: {
        ITEMS_PER_PAGE: 20,
        SKELETON_COUNT: 12,
    },
    ANIMATION: {
        DURATION: {
            FAST: 300,
            NORMAL: 500,
            SLOW: 800,
        },
    },
};

/**
 * @constant {object} TYPE_COLORS
 * @description Colores Tailwind para cada tipo de Pokémon (bg + text).
 * DRY: Fuente única de verdad — usado por PokemonCard y PokemonDetail.
 */
export const TYPE_COLORS = {
    normal: "bg-stone-300 text-stone-800",
    fire: "bg-orange-500 text-white",
    water: "bg-blue-500 text-white",
    electric: "bg-yellow-400 text-yellow-900",
    grass: "bg-green-500 text-white",
    ice: "bg-cyan-300 text-cyan-900",
    fighting: "bg-red-700 text-white",
    poison: "bg-purple-600 text-white",
    ground: "bg-amber-600 text-white",
    flying: "bg-indigo-300 text-indigo-900",
    psychic: "bg-pink-500 text-white",
    bug: "bg-lime-500 text-lime-900",
    rock: "bg-stone-500 text-white",
    ghost: "bg-violet-700 text-white",
    dragon: "bg-indigo-700 text-white",
    dark: "bg-slate-800 text-white",
    steel: "bg-slate-400 text-slate-900",
    fairy: "bg-pink-300 text-pink-900",
};

/**
 * @constant {object} LAYOUT
 * @description Clases Tailwind compartidas para layouts.
 */
export const LAYOUT = {
    ROOT_CLASSES: "min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300",
};

/**
 * @constant {object} FALLBACKS
 * @description Objetos fallback para datos inválidos.
 */
export const INVALID_POKEMON_FALLBACK = Object.freeze({
    id: 0,
    name: "Unknown",
    types: [],
    sprites: {},
    stats: [],
});
