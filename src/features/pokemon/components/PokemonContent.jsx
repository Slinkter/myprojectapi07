import { memo } from "react";
import { UI_CONSTANTS } from "@/utils/constants";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import { HiExclamationCircle, HiRefresh, HiOutlineSearch } from "react-icons/hi";
import PokemonSkeleton from "./PokemonSkeleton";
import PokemonList from "./PokemonList";

const skeletonVariants = {
    initial: { opacity: 0 },
    animate: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const errorVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 }
    }
};

const emptyVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
};

const PokemonContent = memo(({ isLoading, error, pokemons, onRetry }) => {
    if (error) {
        return (
            <motion.div
                variants={errorVariants}
                initial="initial"
                animate="animate"
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl flex flex-col items-center gap-3 sm:gap-4 text-center"
            >
                <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <HiExclamationCircle className="text-red-500 h-10 w-10 sm:h-12 sm:w-12" />
                </motion.div>
                <div>
                    <h3 className="text-red-800 dark:text-red-400 font-bold text-base sm:text-lg">
                        Error de Carga
                    </h3>
                    <p className="text-red-700 dark:text-red-500/80 text-sm sm:text-base">{error}</p>
                </div>
                <motion.button
                    onClick={onRetry}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 sm:px-6 sm:py-2 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20"
                >
                    <HiRefresh className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Reintentar</span>
                </motion.button>
            </motion.div>
        );
    }

    if (isLoading) {
        return (
            <motion.div 
                variants={skeletonVariants}
                initial="initial"
                animate="animate"
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4"
            >
                {[...Array(UI_CONSTANTS.POKEMON_GRID.SKELETON_COUNT)].map(
                    (_, index) => (
                        <PokemonSkeleton key={index} />
                    ),
                )}
            </motion.div>
        );
    }

    if (pokemons.length === 0) {
        return (
            <motion.div
                variants={emptyVariants}
                initial="initial"
                animate="animate"
                className="text-center py-12 sm:py-20 bg-gray-50 dark:bg-slate-800/50 rounded-xl sm:rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700"
            >
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex justify-center mb-4"
                >
                    <HiOutlineSearch className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-slate-600" />
                </motion.div>
                <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-lg font-medium px-4">
                    No se encontraron Pokémon que coincidan con tu búsqueda.
                </p>
            </motion.div>
        );
    }

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                key="pokemon-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <PokemonList pokemons={pokemons} />
            </motion.div>
        </AnimatePresence>
    );
});

PokemonContent.displayName = "PokemonContent";

PokemonContent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    pokemons: PropTypes.array.isRequired,
    onRetry: PropTypes.func.isRequired,
};

export default PokemonContent;