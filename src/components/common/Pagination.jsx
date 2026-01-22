import PropTypes from "prop-types";
import {
    HiChevronLeft,
    HiChevronRight,
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
} from "react-icons/hi";

/**
 * @component Pagination
 * @description Un componente de presentación reutilizable que muestra controles de paginación.
 * **Responsabilidades:**
 * 1.  **Interacción de Usuario:** Provee botones para navegar entre páginas de datos.
 * 2.  **Estado Visual:** Muestra la página actual y el total de páginas.
 *
 * **Efectos Secundarios:**
 * - Invoca el callback `onPageChange` cuando el usuario interactúa con los controles.
 *
 * @param {object} props - Las props del componente.
 * @param {number} props.currentPage - El número de la página activa actualmente.
 * @param {number} props.totalPages - El número total de páginas disponibles.
 * @param {function(number): void} props.onPageChange - Una función de callback que se invoca cuando
 * el usuario interactúa con los controles. Recibe el nuevo número de página como su único argumento.
 *
 * @returns {JSX.Element | null} El conjunto de controles de paginación o `null` si no es necesario.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 py-8">
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                aria-label="Ir a la primera página"
            >
                <HiChevronDoubleLeft className="w-5 h-5" />
            </button>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                aria-label="Ir a la página anterior"
            >
                <HiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm">
                <span className="text-sm font-bold text-primary">
                    {currentPage}
                </span>
                <span className="text-sm text-gray-400">/</span>
                <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
                    {totalPages}
                </span>
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                aria-label="Ir a la página siguiente"
            >
                <HiChevronRight className="w-5 h-5" />
            </button>
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                aria-label="Ir a la última página"
            >
                <HiChevronDoubleRight className="w-5 h-5" />
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
