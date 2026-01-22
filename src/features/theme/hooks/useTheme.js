import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "@/features/theme/state/themeSlice";

/**
 * @hook useTheme
 * @description Un hook personalizado que encapsula toda la lógica para la gestión del tema de la aplicación.
 *
 * @details
 * **Responsabilidades:**
 * 1.  **Gestión de Estado:** Provee el tema actual e interfaz para cambiarlo.
 * 2.  **Detección del Sistema:** Inicializa el tema basándose en las preferencias del sistema si no hay configuración de usuario.
 *
 * **Efectos Secundarios:**
 * - Suscribe un evento (`change`) al `matchMedia` del navegador.
 * - Despacha acciones de Redux cuando cambia la preferencia del sistema.
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
