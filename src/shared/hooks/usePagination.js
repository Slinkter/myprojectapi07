
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '@/features/pokemon/state/pokemonSlice';

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
 * Hook personalizado y reutilizable para gestionar la lógica de paginación.
 * Se integra con el store de Redux para obtener el estado de paginación
 * y despachar acciones para modificarlo.
 *
 * @param {object} params - Parámetros de configuración para el hook.
 * @param {number} params.totalCount - El número total de elementos a paginar.
 * @returns {PaginationResult} Un objeto que contiene el estado y las funciones de la paginación.
 */
export const usePagination = ({ totalCount }) => {
  const dispatch = useDispatch();

  const { currentPage, itemsPerPage } = useSelector((state) => state.pokemon);

  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  /**
   * Navega a una página específica, asegurándose de que esté dentro de los límites.
   * También desplaza la vista al inicio de la página.
   */
  const goToPage = useCallback(
    (pageNumber) => {
      const targetPage = Math.max(1, Math.min(pageNumber, totalPages));
      if (targetPage !== currentPage) {
        dispatch(setPage(targetPage));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [dispatch, currentPage, totalPages]
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
