import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "@/features/pokemon/state/pokemonSlice";

/**
 * @typedef {object} PaginationResult
 * @property {number} currentPage - La página actual.
 * @property {number} totalPages - El número total de páginas disponibles.
 * @property {number} itemsPerPage - El número de elementos por página.
 * @property {function(number): void} goToPage - Función para navegar a una página específica.
 * @property {function(): void} nextPage - Función para navegar a la página siguiente.
 * @property {function(): void} prevPage - Función para navegar a la página anterior.
 */

/**
 * Hook personalizado `usePagination`.
 *
 * **Funcionalidad:**
 * * Controla la lógica de paginación conectada a Redux.
 * * Calcula el número total de páginas basado en el conteo total de items.
 * * Provee métodos seguros de navegación (prev, next, goTo).
 *
 * **Flujo de interacción / ejecución:**
 * 1. Recibe `totalCount` como prop para cálculos locales.
 * 2. Lee `currentPage` y `itemsPerPage` del store global.
 * 3. `goToPage` valida que la página destino sea válida antes de despachar.
 * 4. Al cambiar de página, hace scroll suave al inicio de la ventana.
 *
 * **Estado y efectos secundarios:**
 * * Modifica `state.pokemon.currentPage`.
 * * Ejecuta `window.scrollTo` como efecto visual.
 *
 * @param {object} params - Parámetros de configuración.
 * @param {number} params.totalCount - Cantidad total de registros remotos.
 * @returns {PaginationResult} API de paginación lista para consumir por UI.
 */
export const usePagination = ({ totalCount }) => {
    const dispatch = useDispatch();

    const { currentPage, itemsPerPage } = useSelector((state) => state.pokemon);

    const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

    /**
     * Navega a una página específica.
     * Valida rangos y realiza scroll to top.
     *
     * @param {number} pageNumber - Número de página destino.
     */
    const goToPage = useCallback(
        (pageNumber) => {
            const targetPage = Math.max(1, Math.min(pageNumber, totalPages));
            if (targetPage !== currentPage) {
                dispatch(setPage(targetPage));
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        },
        [dispatch, currentPage, totalPages],
    );

    /**
     * Navega a la página siguiente si no es la última.
     */
    const nextPage = useCallback(() => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }, [currentPage, totalPages, goToPage]);

    /**
     * Navega a la página anterior si no es la primera.
     */
    const prevPage = useCallback(() => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }, [currentPage, goToPage]);

    return {
        currentPage,
        totalPages,
        itemsPerPage,
        goToPage,
        nextPage,
        prevPage,
    };
};
