import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { HiStar } from "react-icons/hi";

/**
 * @component PokemonCard
 * @description
 * Componente optimizado siguiendo los principios de la Proporción Áurea (Phi ≈ 1.618).
 */
const PokemonCard = React.memo(({ id, name, image, types, favorite, index = 0 }) => {
    const { togglePokemonFavorite } = useFavorites();

    const handleFavoriteClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePokemonFavorite(id);
    }, [id, togglePokemonFavorite]);

    return (
        <div
            className="group relative flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer animate-slide-in"
            style={{
                animationDelay: `${index * 50}ms`,
                opacity: 0,
                animationFillMode: "forwards",
            }}
        >
            {/* --- HEADER: Espaciado basado en Phi --- */}
            <div className="flex justify-between items-center p-6">
                <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase">
                    #{String(id).padStart(3, "0")}
                </span>
                <button
                    onClick={handleFavoriteClick}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 active:scale-90"
                    aria-label="Marcar como favorito"
                >
                    <HiStar
                        className={`h-6 w-6 transition-colors duration-300 ${
                            favorite ? "text-yellow-400 scale-110" : "text-gray-300 dark:text-slate-600"
                        }`}
                    />
                </button>
            </div>

            {/* --- BODY: Ratio 1:1.618 en el contenedor de imagen --- */}
            <div className="flex-grow flex flex-col items-center px-6 pb-8">
                <div className="relative w-40 h-40 mb-6 group-hover:scale-110 transition-transform duration-700 ease-out">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain drop-shadow-2xl"
                        loading="lazy"
                    />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white capitalize tracking-tight text-center">
                    {name}
                </h2>
            </div>

            {/* --- FOOTER: Balance visual y contraste --- */}
            <div className="p-6 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700">
                <div className="flex flex-wrap justify-center gap-3">
                    {types.map((typeInfo) => (
                        <span
                            key={typeInfo.type.name}
                            className="px-4 py-1.5 text-xs font-bold capitalize rounded-full bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 shadow-sm hover:border-primary transition-colors duration-300"
                        >
                            {typeInfo.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
});

PokemonCard.displayName = "PokemonCard";

PokemonCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
        }),
    ).isRequired,
    favorite: PropTypes.bool.isRequired,
    index: PropTypes.number,
};

export default PokemonCard;

