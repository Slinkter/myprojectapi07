import PropTypes from "prop-types";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { HiStar } from "react-icons/hi";

/**
 * @component PokemonCard
 * @description
 * Un componente de presentación que muestra la información resumida de un Pokémon en
 * un formato de tarjeta interactiva. Es el "átomo" visual de la cuadrícula de Pokémon.
 *
 * **Responsabilidades:**
 * 1.  **Presentación de Datos:** Renderiza el ID, nombre, imagen y tipos de un Pokémon.
 * 2.  **Interactividad:** Permite al usuario marcar/desmarcar el Pokémon como favorito a través
 *     de un botón de estrella. La lógica se delega al hook `useFavorites`.
 * 3.  **Animación:** Implementa una animación de entrada escalonada (`staggered animation`)
 *     basada en su prop `index` para un efecto visual agradable.
 *
 * **Optimización:**
 * - Las imágenes de los Pokémon utilizan `loading="lazy"` para mejorar el rendimiento de carga de la página.
 * - Los eventos de clic en el botón de favorito usan `stopPropagation` para prevenir conflictos.
 *
 * **Efectos Secundarios:**
 * - Al interactuar con el botón de favorito, invoca `togglePokemonFavorite` del hook `useFavorites`, causando una actualización en el store de Redux y en `localStorage`.
 *
 * @param {object} props - Propiedades del componente.
 * @param {number} props.id - El ID nacional del Pokémon.
 * @param {string} props.name - El nombre del Pokémon.
 * @param {string} props.image - La URL de la imagen (artwork oficial).
 * @param {Array<object>} props.types - La lista de tipos del Pokémon.
 * @param {boolean} props.favorite - `true` si el Pokémon está marcado como favorito.
 * @param {number} [props.index=0] - El índice de la tarjeta en la lista, usado para la animación.
 * @returns {JSX.Element} Un `div` que representa la tarjeta del Pokémon.
 */
const PokemonCard = ({ id, name, image, types, favorite, index = 0 }) => {
    const { togglePokemonFavorite } = useFavorites();

    /**
     * Manejador de clic en Favorito.
     *
     * **Funcionalidad:**
     * * Previene la navegación/acción predeterminada de la tarjeta.
     * * Dispara la acción de toggle en el store de favoritos.
     *
     * @param {React.MouseEvent} e - Evento sintético del mouse.
     */
    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePokemonFavorite(id);
    };

    return (
        <div
            className="group relative flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-slide-in"
            style={{
                animationDelay: `${index * 50}ms`,
                opacity: 0,
                animationFillMode: "forwards",
            }}
        >
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center p-4">
                <span className="text-xs font-bold text-gray-400 dark:text-slate-500">
                    #{String(id).padStart(3, "0")}
                </span>
                <button
                    onClick={handleFavoriteClick}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Marcar como favorito"
                >
                    <HiStar
                        className={`h-6 w-6 transition-colors ${
                            favorite
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-slate-600"
                        }`}
                    />
                </button>
            </div>

            {/* --- BODY --- */}
            <div className="flex-grow flex flex-col items-center px-4 pb-4">
                <div className="relative w-32 h-32 mb-4 group-hover:scale-110 transition-transform duration-500">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                    />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize tracking-tight">
                    {name}
                </h2>
            </div>

            {/* --- FOOTER --- */}
            <div className="p-4 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700">
                <div className="flex flex-wrap justify-center gap-2">
                    {types.map((typeInfo) => (
                        <span
                            key={typeInfo.type.name}
                            className="px-3 py-1 text-xs font-bold capitalize rounded-full bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 shadow-sm"
                        >
                            {typeInfo.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

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
