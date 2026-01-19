import PropTypes from "prop-types";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi";

/**
 * A reusable component for displaying pagination controls.
 * It is a presentational component that relies on parent components
 * to provide its state and handle events.
 *
 * @param {object} props - The component props.
 * @param {number} props.currentPage - The currently active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {function} props.onPageChange - Callback function invoked when a page button is clicked. It receives the new page number as an argument.
 * @returns {JSX.Element|null} The rendered pagination controls, or null if there's only one page.
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
        aria-label="Go to first page"
      >
        <HiChevronDoubleLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
        aria-label="Go to previous page"
      >
        <HiChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm">
        <span className="text-sm font-bold text-primary">{currentPage}</span>
        <span className="text-sm text-gray-400">/</span>
        <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
          {totalPages}
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
        aria-label="Go to next page"
      >
        <HiChevronRight className="w-5 h-5" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
        aria-label="Go to last page"
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
