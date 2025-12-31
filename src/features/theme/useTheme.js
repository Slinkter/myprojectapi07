import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "@/features/theme/themeSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(currentTheme === 'dark' ? 'light' : 'dark');
    root.classList.add(currentTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      // Only update if the user hasn't explicitly set a theme
      if (!localStorage.getItem('app_theme')) {
        dispatch(setTheme(systemTheme));
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [currentTheme, dispatch]);

  const toggleAppTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return {
    currentTheme,
    toggleAppTheme,
  };
};
