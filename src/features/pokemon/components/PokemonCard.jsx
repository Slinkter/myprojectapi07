import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { HiStar } from "react-icons/hi";
import { motion } from "motion/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { TYPE_COLORS } from "@/utils/constants";
import "react-lazy-load-image-component/src/effects/blur.css";

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

const starVariants = {
    initial: { scale: 1, rotate: 0 },
    tappable: { scale: 0.85, rotate: -15, transition: { duration: 0.1 } },
    favorite: { scale: 1.2, rotate: 15, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

/**
 * @component PokemonCard
 * @description
 * Componente optimizado con animaciones Motion para entrada y hover.
 * motion se usa solo para: card entrance animation y favorite star spring animation.
 * El resto usa CSS transitions para evitar 80+ instancias de animación.
 */
const PokemonCard = React.memo(({ id, name, image, types, favorite, index = 0 }) => {
    const navigate = useNavigate();
    const { togglePokemonFavorite } = useFavorites();
    const reducedMotion = useReducedMotion();

    const handleCardClick = useCallback(() => {
        navigate(`/pokemon/${id}`);
    }, [id, navigate]);

    const handleFavoriteClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePokemonFavorite(id);
    }, [id, togglePokemonFavorite]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
        }
    }, [handleCardClick]);

    const getTypeClass = (typeName) => TYPE_COLORS[typeName?.toLowerCase()] || "bg-gray-300 text-gray-800";

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? false : "visible"}
            whileHover={reducedMotion ? undefined : "hover"}
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className="group relative flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl"
            style={{ overflow: "hidden" }}
        >
            <div className="flex justify-between items-center p-3 sm:p-4 md:p-6">
                <span
                    className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase animate-fade-in-left"
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                    #{String(id).padStart(3, "0")}
                </span>
                <button
                    onClick={handleFavoriteClick}
                    className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                    aria-pressed={favorite}
                    aria-label={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
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
                </button>
            </div>

            <div className="flex-grow flex flex-col items-center px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 md:pb-8">
                <div
                    className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-3 sm:mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[3deg]"
                >
                    <LazyLoadImage
                        src={image}
                        alt={name}
                        effect="blur"
                        className="w-full h-full object-contain drop-shadow-xl"
                        placeholderSrc={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlMmU4ZTYiLz48L3N2Zz4=`}
                    />
                </div>
                <h2
                    className="text-sm sm:text-lg md:text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white capitalize tracking-tight text-center animate-fade-in-up"
                    style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                >
                    {name}
                </h2>
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
                            <span
                                key={`${typeName}-${idx}`}
                                className={`px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5 text-[10px] sm:text-xs font-bold capitalize rounded-full shadow-sm animate-scale-in ${getTypeClass(typeName)}`}
                                style={{ animationDelay: `${0.2 + idx * 0.05 + index * 0.05}s` }}
                            >
                                {typeName}
                            </span>
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

