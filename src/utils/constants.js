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
 * @description Colores Tailwind para cada tipo de Pokémon.
 * DRY: Compartido con PokemonCard y PokemonDetail.
 */
export const TYPE_COLORS = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-300",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-amber-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-stone-500",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    steel: "bg-slate-400",
    fairy: "bg-pink-300",
};
