/**
 * @module shared/components/Pagination
 * @description Componente de paginación con animaciones.
 */

import PropTypes from "prop-types";
import { motion } from "motion/react";
import {
    HiChevronLeft,
    HiChevronRight,
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
} from "react-icons/hi";

const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
};

const pageVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <motion.div 
            className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 py-4 sm:py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700"
                aria-label="Ir a la primera página"
                whileHover={currentPage !== 1 ? "hover" : undefined}
                whileTap="tap"
                variants={buttonVariants}
            >
                <HiChevronDoubleLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700"
                aria-label="Ir a la página anterior"
                whileHover={currentPage !== 1 ? "hover" : undefined}
                whileTap="tap"
                variants={buttonVariants}
            >
                <HiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            <motion.div 
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm"
                initial="initial"
                animate="animate"
            >
                <motion.span 
                    key={currentPage}
                    className="text-xs sm:text-sm font-bold text-primary"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                >
                    {currentPage}
                </motion.span>
                <span className="text-xs sm:text-sm text-gray-400">/</span>
                <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-slate-400">
                    {totalPages}
                </span>
            </motion.div>

            <motion.button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700"
                aria-label="Ir a la página siguiente"
                whileHover={currentPage !== totalPages ? "hover" : undefined}
                whileTap="tap"
                variants={buttonVariants}
            >
                <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700"
                aria-label="Ir a la última página"
                whileHover={currentPage !== totalPages ? "hover" : undefined}
                whileTap="tap"
                variants={buttonVariants}
            >
                <HiChevronDoubleRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
        </motion.div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;