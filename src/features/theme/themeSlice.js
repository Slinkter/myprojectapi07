import { createSlice } from "@reduxjs/toolkit";

const THEME_STORAGE_KEY = 'app_theme';

const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // Default to light if not in browser or no preference
};

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
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, state.currentTheme);
      } catch (error) {
        console.error("Failed to save theme to localStorage", error);
      }
    },
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
