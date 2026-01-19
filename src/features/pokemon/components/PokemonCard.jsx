import PropTypes from "prop-types";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { HiStar } from "react-icons/hi";

/**
 * Componente PokemonCard.
 *
 * **Funcionalidad:**
 * * Presenta la información resumida de un Pokémon en formato de tarjeta.
 * * Permite la interacción directa para marcar/desmarcar como favorito.
 * * Gestiona animaciones de entrada progresiva (staggered animation) basado en su índice.
 *
 * **Flujo de interacción / ejecución:**
 * 1. Recibe datos crudos del Pokémon (id, nombre, imagen, tipos).
 * 2. Determina visualmente si es favorito mediante la prop boolean `favorite`.
 * 3. El botón de estrella intercepta el evento de clic (`stopPropagation`) para evitar conflictos si la tarjeta completa fuera clickeable.
 * 4. Invoca `togglePokemonFavorite` del hook `useFavorites` al interactuar con la estrella.
 *
 * **Estado y efectos secundarios:**
 * * Utiliza el hook `useFavorites` para comunicar la intención del usuario de modificar la lista de favoritos.
 * * Aplica una animación CSS (`animate-slide-in`) con un `animationDelay` calculado dinámicamente.
 *
 * @param {object} props - Propiedades del componente.
 * @param {number} props.id - Identificador único nacional del Pokémon.
 * @param {string} props.name - Nombre del Pokémon (será capitalizado por CSS).
 * @param {string} props.image - URL absoluta de la imagen (sprite) del Pokémon.
 * @param {Array<object>} props.types - Lista de objetos de tipo ({ type: { name: string } }).
 * @param {boolean} props.favorite - Estado actual de favorito (true/false).
 * @param {number} [props.index=0] - Índice numérico en el listado para calcular el delay de animación.
 * @returns {JSX.Element} Tarjeta interactiva del Pokémon.
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
