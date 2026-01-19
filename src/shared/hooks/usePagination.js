import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { UI_CONSTANTS } from "@/utils/constants";

/**
 * @hook usePagination
 * @description Un hook reutilizable que encapsula toda la lógica de paginación,
 * sincronizando el estado con los query params de la URL.
 *
 * @param {object} options - Opciones de configuración para la paginación.
 * @param {number} options.totalCount - El número total de items a paginar. Es obligatorio.
 * @param {number} [options.itemsPerPage=UI_CONSTANTS.POKEMON_GRID.ITEMS_PER_PAGE] - El número de items por página.
 *
 * @returns {{
 *   currentPage: number,
 *   totalPages: number,
 *   itemsPerPage: number,
 *   goToPage: (pageNumber: number) => void
 * }} Un objeto con el estado de la paginación y las funciones para controlarla.
 */
export const usePagination = ({
  totalCount,
  itemsPerPage = UI_CONSTANTS.POKEMON_GRID.ITEMS_PER_PAGE,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Se usa una función en useState para que el cálculo inicial solo se ejecute una vez.
  const [currentPage, setCurrentPage] = useState(() =>
    Number(searchParams.get("page") || 1)
  );

  const totalPages = useMemo(
    () => Math.ceil(totalCount / itemsPerPage) || 1,
    [totalCount, itemsPerPage]
  );

  const goToPage = useCallback(
    (pageNumber) => {
      // Asegura que el número de página esté dentro de los límites válidos.
      const targetPage = Math.max(1, Math.min(pageNumber, totalPages));
      setCurrentPage(targetPage);
      setSearchParams({ page: String(targetPage) });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [totalPages, setSearchParams]
  );

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
  };
};