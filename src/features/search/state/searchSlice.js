import { createSlice } from "@reduxjs/toolkit";

/**
 * @module searchSlice
 * @description Este módulo define el "slice" de Redux para la funcionalidad de búsqueda.
 * Gestiona el estado del término de búsqueda introducido por el usuario.
 */

/**
 * @typedef {object} SearchState
 * @property {string} searchFilter - El término de búsqueda actual, siempre en minúsculas.
 */

/**
 * El estado inicial para el slice de búsqueda.
 * @type {SearchState}
 */
const initialState = {
    searchFilter: "",
};

/**
 * @constant {import('@reduxjs/toolkit').Slice} searchSlice
 * @summary Slice de Redux para gestionar el estado de la búsqueda.
 * @description Contiene el estado inicial, el nombre del slice y los reducers
 * para manipular el estado del filtro de búsqueda.
 */
const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        /**
         * @function setSearchFilter
         * @description Reducer para actualizar el término de búsqueda en el estado.
         * El texto se convierte a minúsculas para asegurar una búsqueda 'case-insensitive'.
         * @param {SearchState} state - El estado actual del slice de búsqueda.
         * @param {import('@reduxjs/toolkit').PayloadAction<string>} action - La acción de Redux que contiene el nuevo término de búsqueda.
         */
        setSearchFilter: (state, action) => {
            state.searchFilter = action.payload.toLowerCase();
        },
    },
});

/**
 * @constant {object} actions
 * @summary Acciones de Redux exportadas del slice de búsqueda.
 * @property {import('@reduxjs/toolkit').ActionCreatorWithPayload<string>} setSearchFilter - Acción para establecer el filtro de búsqueda.
 */
export const { setSearchFilter } = searchSlice.actions;

/**
 * @constant {import('@reduxjs/toolkit').Reducer<SearchState>} reducer
 * @summary Reducer principal del slice de búsqueda.
 * @description Este reducer se combina en el store principal de Redux.
 */
export default searchSlice.reducer;
