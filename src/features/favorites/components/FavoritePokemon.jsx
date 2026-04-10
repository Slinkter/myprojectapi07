import PropTypes from "prop-types";
import { motion } from "motion/react";

const FavoritePokemon = ({ fav }) => {
    return (
        <motion.div
            layout
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 cursor-pointer shadow-sm hover:shadow-md transition-all"
        >
            <motion.img
                key={`img-${fav.id}`}
                src={fav.sprites?.front_default || "/placeholder-pokemon.png"}
                alt={fav.name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.3 } }}
            />
            <span className="text-sm sm:text-base font-semibold capitalize text-gray-800 dark:text-gray-100">
                {fav.name}
            </span>
        </motion.div>
    );
};

FavoritePokemon.propTypes = {
    fav: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        sprites: PropTypes.shape({
            front_default: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default FavoritePokemon;
