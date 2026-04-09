import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { HiStar } from "react-icons/hi";
import { motion } from "motion/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const typeColors = {
    normal: "bg-stone-300 text-stone-800",
    fire: "bg-orange-500 text-white",
    water: "bg-blue-500 text-white",
    electric: "bg-yellow-400 text-yellow-900",
    grass: "bg-green-500 text-white",
    ice: "bg-cyan-300 text-cyan-900",
    fighting: "bg-red-700 text-white",
    poison: "bg-purple-600 text-white",
    ground: "bg-amber-600 text-white",
    flying: "bg-indigo-300 text-indigo-900",
    psychic: "bg-pink-500 text-white",
    bug: "bg-lime-500 text-lime-900",
    rock: "bg-stone-500 text-white",
    ghost: "bg-violet-700 text-white",
    dragon: "bg-indigo-700 text-white",
    dark: "bg-slate-800 text-white",
    steel: "bg-slate-400 text-slate-900",
    fairy: "bg-pink-300 text-pink-900",
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: index * 0.05,
            duration: 0.4,
            ease: "easeOut",
        },
    }),
    hover: {
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};

const imageVariants = {
    hover: { scale: 1.15, rotate: [0, -5, 5, 0], transition: { duration: 0.6 } },
};

const starVariants = {
    initial: { scale: 1, rotate: 0 },
    tappable: { scale: 0.85, rotate: -15, transition: { duration: 0.1 } },
    favorite: { scale: 1.2, rotate: 15, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

/**
 * @component PokemonCard
 * @description
 * Componente optimizado con animaciones Motion para entrada, hover y presiones.
 */
const PokemonCard = React.memo(({ id, name, image, types, favorite, index = 0 }) => {
    const navigate = useNavigate();
    const { togglePokemonFavorite } = useFavorites();

    const handleCardClick = useCallback(() => {
        navigate(`/pokemon/${id}`);
    }, [id, navigate]);

    const handleFavoriteClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePokemonFavorite(id);
    }, [id, togglePokemonFavorite]);

    const getTypeClass = (typeName) => typeColors[typeName?.toLowerCase()] || "bg-gray-300 text-gray-800";

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={handleCardClick}
            className="group relative flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl"
            style={{ overflow: "hidden" }}
        >
            <div className="flex justify-between items-center p-3 sm:p-4 md:p-6">
                <motion.span 
                    className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                >
                    #{String(id).padStart(3, "0")}
                </motion.span>
                <motion.button
                    onClick={handleFavoriteClick}
                    className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                    whileTap={favorite ? "favorite" : "tappable"}
                    aria-label="Marcar como favorito"
                >
                    <motion.div
                        variants={starVariants}
                        animate={favorite ? "favorite" : "initial"}
                    >
                        <HiStar
                            className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transition-colors duration-300 ${
                                favorite ? "text-yellow-400" : "text-gray-300 dark:text-slate-600"
                            }`}
                        />
                    </motion.div>
                </motion.button>
            </div>

            <div className="flex-grow flex flex-col items-center px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 md:pb-8">
                <motion.div
                    variants={imageVariants}
                    className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-3 sm:mb-4 md:mb-6"
                >
                    <LazyLoadImage
                        src={image}
                        alt={name}
                        effect="blur"
                        className="w-full h-full object-contain drop-shadow-xl"
                        placeholderSrc={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlMmU4ZTYiLz48L3N2Zz4=`}
                    />
                </motion.div>
                <motion.h2 
                    className="text-sm sm:text-lg md:text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white capitalize tracking-tight text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                >
                    {name}
                </motion.h2>
            </div>

            <div className="p-3 sm:p-4 md:p-6 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700">
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3">
                    {types && Array.isArray(types) && types.map((typeItem, idx) => {
                        let typeName = "unknown";
                        if (typeof typeItem === "string") {
                            typeName = typeItem;
                        } else if (typeItem?.type?.name) {
                            typeName = typeItem.type.name;
                        } else if (typeItem?.name) {
                            typeName = typeItem.name;
                        }
                        return (
                            <motion.span
                                key={`${typeName}-${idx}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + idx * 0.05 + index * 0.05 }}
                                className={`px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5 text-[10px] sm:text-xs font-bold capitalize rounded-full shadow-sm ${getTypeClass(typeName)}`}
                            >
                                {typeName}
                            </motion.span>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
});

PokemonCard.displayName = "PokemonCard";

PokemonCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                type: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }),
            }),
            PropTypes.shape({
                name: PropTypes.string.isRequired,
            }),
        ]),
    ).isRequired,
    favorite: PropTypes.bool.isRequired,
    index: PropTypes.number,
};

export default PokemonCard;

