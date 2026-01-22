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
