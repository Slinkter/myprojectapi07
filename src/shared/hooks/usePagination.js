import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * @typedef {object} PaginationResult
 * @property {number} currentPage - La página actual.
 * @property {number} totalPages - El número total de páginas disponibles.
 * @property {number} itemsPerPage - El número de elementos por página.
 * @property {function(number): void} goToPage - Función para navegar a una página específica.
 */

const ITEMS_PER_PAGE = 20;

/**
 * Hook personalizado `usePagination`.
 *
 * **Funcionalidad:**
 * * Controla la lógica de paginación de forma autocontenida.
 * * Sincroniza el estado de la página con los query params de la URL (`?page=...`).
 * * Calcula el número total de páginas y provee métodos de navegación.
 *
 * **Flujo de interacción / ejecución:**
 * 1. Lee el `page` del query param de la URL como fuente de verdad inicial.
 * 2. Almacena la página actual en un estado local de React.
 * 3. `goToPage` actualiza el estado y el query param de la URL.
 * 4. Al cambiar de página, hace scroll suave al inicio de la ventana.
 *
 * @param {object} params - Parámetros de configuración.
 * @param {number} params.totalCount - Cantidad total de registros.
 * @returns {PaginationResult} API de paginación lista para consumir por UI.
 */
export const usePagination = ({ totalCount }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get("page") || 1),
    );

    const totalPages = useMemo(
        () => Math.ceil(totalCount / ITEMS_PER_PAGE) || 1,
        [totalCount],
    );

    const goToPage = useCallback(
        (pageNumber) => {
            const targetPage = Math.max(1, Math.min(pageNumber, totalPages));
            setCurrentPage(targetPage);
            setSearchParams({ page: targetPage });
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        [totalPages, setSearchParams],
    );

    return {
        currentPage,
        totalPages,
        itemsPerPage: ITEMS_PER_PAGE,
        goToPage,
    };
};
