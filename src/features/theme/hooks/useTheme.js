import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "@/features/theme/state/themeSlice";

/**
 * @hook useTheme
 * @description Un hook personalizado que encapsula toda la lógica para la gestión del tema de la aplicación.
 *
 * @details
 * Este hook actúa como una fachada (Facade) sobre el estado del tema en Redux. Sus responsabilidades son:
 * 1.  Proporcionar el tema actual (`currentTheme`).
 * 2.  Proporcionar una función para alternar el tema (`toggleAppTheme`).
 * 3.  (Efecto secundario) Escuchar los cambios del tema preferido del sistema operativo y
 *     actualizar el estado de la aplicación si el usuario no ha hecho una selección manual.
 *
 * @returns {{
 *   currentTheme: ('light' | 'dark'),
 *   toggleAppTheme: () => void
 * }} Un objeto que contiene el tema actual y la función para alternarlo.
 */
export const useTheme = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    useEffect(() => {
        // Escucha los cambios del tema del sistema
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        /**
         * Maneja los cambios del tema del sistema.
         * @param {MediaQueryListEvent} e - El evento de media query.
         */
        const handleChange = (e) => {
            const systemTheme = e.matches ? "dark" : "light";
            // Solo actualiza si el usuario no ha establecido explícitamente un tema
            if (!localStorage.getItem("app_theme")) {
                dispatch(setTheme(systemTheme));
            }
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [dispatch]);

    /**
     * Alterna el tema de la aplicación entre 'light' y 'dark'.
     */
    const toggleAppTheme = useCallback(() => {
        dispatch(toggleTheme());
    }, [dispatch]);

    return {
        currentTheme,
        toggleAppTheme,
    };
};
