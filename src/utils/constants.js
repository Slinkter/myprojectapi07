/**
 * UI_CONSTANTS provides a centralized place for managing various UI-related constants
 * throughout the application, such as pagination limits, skeleton counts, and animation durations.
 * This approach enhances maintainability and consistency across the user interface.
 * @namespace UI_CONSTANTS
 */
export const UI_CONSTANTS = {
    /**
     * Constants related to the Pokémon grid display.
     * @memberof UI_CONSTANTS
     * @property {number} ITEMS_PER_PAGE - The number of Pokémon to display per page in the grid.
     * @property {number} SKELETON_COUNT - The number of skeleton loaders to display while Pokémon are loading.
     */
    POKEMON_GRID: {
        ITEMS_PER_PAGE: 20,
        SKELETON_COUNT: 12,
    },
    /**
     * Constants related to animations.
     * @memberof UI_CONSTANTS
     * @property {object} DURATION - Different durations for animations.
     * @property {number} DURATION.FAST - Fast animation duration in milliseconds.
     * @property {number} DURATION.NORMAL - Normal animation duration in milliseconds.
     * @property {number} DURATION.SLOW - Slow animation duration in milliseconds.
     */
    ANIMATION: {
        DURATION: {
            FAST: 300,
            NORMAL: 500,
            SLOW: 800,
        },
    },
};
