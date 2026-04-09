import PropTypes from "prop-types";
import { motion, AnimatePresence } from "motion/react";
import FavoritePokemon from "./FavoritePokemon";

const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: { 
        opacity: 0, 
        scale: 0.8,
        transition: { duration: 0.2 }
    }
};

const FavoritesBar = ({ favoritePokemons }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm"
        >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                Favoritos
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 min-h-[36px] sm:min-h-[40px] items-center">
                <AnimatePresence mode="popLayout">
                    {favoritePokemons.length > 0 ? (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-1.5 sm:gap-2"
                        >
                            {favoritePokemons.map((fav) => (
                                <motion.div
                                    key={fav.id}
                                    variants={itemVariants}
                                    layout
                                >
                                    <FavoritePokemon fav={fav} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs sm:text-sm text-gray-500 dark:text-slate-400"
                        >
                            No has seleccionado ningún Pokémon favorito.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

FavoritesBar.propTypes = {
    favoritePokemons: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            name: PropTypes.string.isRequired,
            sprites: PropTypes.object,
        }),
    ).isRequired,
};

export default FavoritesBar;
