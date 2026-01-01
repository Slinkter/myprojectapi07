import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "@/features/theme/state/themeSlice";

/**
 * Custom hook for managing the application's theme.
 * It provides the current theme and a function to toggle it.
 * It also listens for system theme changes and updates the theme accordingly
 * if the user has not explicitly set a theme.
 *
 * @returns {{
 *   currentTheme: 'light' | 'dark',
 *   toggleAppTheme: () => void
 * }}
 */
export const useTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    /**
     * Handles system theme changes.
     * @param {MediaQueryListEvent} e - The media query event.
     */
    const handleChange = (e) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      // Only update if the user hasn't explicitly set a theme
      if (!localStorage.getItem('app_theme')) {
        dispatch(setTheme(systemTheme));
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  /**
   * Toggles the application theme between 'light' and 'dark'.
   */
  const toggleAppTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return {
    currentTheme,
    toggleAppTheme,
  };
};
