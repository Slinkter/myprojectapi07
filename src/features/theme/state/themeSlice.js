import { createSlice } from "@reduxjs/toolkit";

const THEME_STORAGE_KEY = 'app_theme';

/**
 * Gets the system's preferred color scheme.
 * @returns {'dark' | 'light'} The system's preferred theme.
 */
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // Default to light if not in browser or no preference
};

/**
 * Gets the initial theme for the application.
 * It first checks for a theme preference in localStorage. If not found, it falls back to the system's preferred theme.
 * @returns {'dark' | 'light'} The initial theme for the application.
 */
const getInitialTheme = () => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch (error) {
    console.error("Failed to read theme from localStorage", error);
  }
  return getSystemTheme();
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currentTheme: getInitialTheme(),
  },
  reducers: {
    /**
     * Toggles the current theme between 'light' and 'dark' and saves the preference to localStorage.
     * @param {object} state - The current state.
     */
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, state.currentTheme);
      } catch (error) {
        console.error("Failed to save theme to localStorage", error);
      }
    },
    /**
     * Sets the current theme to a specific value and saves the preference to localStorage.
     * @param {object} state - The current state.
     * @param {object} action - The Redux action.
     * @param {'light' | 'dark'} action.payload - The theme to set.
     */
    setTheme: (state, action) => {
      if (action.payload === 'light' || action.payload === 'dark') {
        state.currentTheme = action.payload;
        try {
          localStorage.setItem(THEME_STORAGE_KEY, state.currentTheme);
        } catch (error) {
          console.error("Failed to save theme to localStorage", error);
        }
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
