import { createSlice } from "@reduxjs/toolkit";

/**
 * @module themeSlice
 * @description
 * Este módulo define el "slice" de Redux para la gestión del tema de la aplicación (claro/oscuro).
 * Es la fuente única de verdad para el estado del tema y maneja la persistencia
 * de la elección del usuario en localStorage.
 */

const THEME_STORAGE_KEY = "app_theme";

/**
 * Obtiene el esquema de color preferido del sistema operativo.
 * @returns {'dark' | 'light'} El tema preferido del sistema.
 */
const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light"; // Default a 'light' si no se puede determinar (ej. SSR)
};

/**
 * Determina el tema inicial para la aplicación siguiendo un orden de prioridad:
 * 1. Tema guardado explícitamente por el usuario en localStorage.
 * 2. Tema preferido del sistema operativo.
 * 3. Tema por defecto ('light').
 * @returns {'dark' | 'light'} El tema inicial para la aplicación.
 */
const getInitialTheme = () => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch (error) {
    console.error("No se pudo leer el tema desde localStorage", error);
  }
  return getSystemTheme();
};

/**
 * @typedef {'light' | 'dark'} Theme
 */

/**
 * @typedef {object} ThemeState
 * @property {Theme} currentTheme - El tema activo actualmente en la aplicación.
 */

/**
 * El estado inicial para el slice del tema.
 * @type {ThemeState}
 */
const initialState = {
  currentTheme: getInitialTheme(),
};

/**
 * @constant {import('@reduxjs/toolkit').Slice} themeSlice
 * @summary Slice de Redux para gestionar el estado del tema.
 * @description
 * Este slice es responsable de almacenar el tema actual. Sus reducers
 * (`toggleTheme`, `setTheme`) actualizan el estado y, como efecto secundario,
 * persisten la elección del usuario en localStorage para mantener la consistencia entre sesiones.
 */
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /**
     * Alterna el tema actual entre 'light' y 'dark' y guarda la preferencia en localStorage.
     * @param {ThemeState} state - El estado actual del slice.
     */
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, state.currentTheme);
      } catch (error) {
        console.error("No se pudo guardar el tema en localStorage", error);
      }
    },
    /**
     * Establece el tema actual a un valor específico y guarda la preferencia en localStorage.
     * @param {ThemeState} state - El estado actual del slice.
     * @param {import('@reduxjs/toolkit').PayloadAction<Theme>} action - La acción de Redux con el tema a establecer.
     */
    setTheme: (state, action) => {
      if (action.payload === "light" || action.payload === "dark") {
        state.currentTheme = action.payload;
        try {
          localStorage.setItem(THEME_STORAGE_KEY, state.currentTheme);
        } catch (error) {
          console.error("No se pudo guardar el tema en localStorage", error);
        }
      }
    },
  },
});

/**
 * @constant {object} actions
 * @summary Acciones de Redux exportadas del slice de tema.
 * @property {import('@reduxjs/toolkit').ActionCreatorWithoutPayload} toggleTheme - Acción para alternar entre tema claro y oscuro.
 * @property {import('@reduxjs/toolkit').ActionCreatorWithPayload<Theme>} setTheme - Acción para establecer un tema específico.
 */
export const { toggleTheme, setTheme } = themeSlice.actions;

/**
 * @constant {import('@reduxjs/toolkit').Reducer<ThemeState>} reducer
 * @summary Reducer principal del slice de tema.
 */
export default themeSlice.reducer;