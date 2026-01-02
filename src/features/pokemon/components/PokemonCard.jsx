
import PropTypes from 'prop-types';
import { useFavorites } from '@/features/favorites/hooks/useFavorites';
import { HiStar } from "react-icons/hi";

/**
 * A component that displays a single Pokémon card with its details.
 * @param {object} props - The component props.
 * @param {number} props.id - The ID of the Pokémon.
 * @param {string} props.name - The name of the Pokémon.
 * @param {string} props.image - The URL of the Pokémon's image.
 * @param {Array<object>} props.types - The types of the Pokémon.
 * @param {boolean} props.favorite - Whether the Pokémon is a favorite.
 * @param {number} [props.index=0] - The index of the card for animation delay.
 * @returns {JSX.Element} The rendered Pokémon card component.
 */
const PokemonCard = ({ id, name, image, types, favorite, index = 0 }) => {
  const { togglePokemonFavorite } = useFavorites();

  /**
   * Handles the click event on the favorite icon.
   * @param {React.MouseEvent} e - The mouse event.
   */
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePokemonFavorite(id);
  };

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-slide-in"
      style={{ animationDelay: `${index * 50}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center p-4">
        <span className="text-xs font-bold text-gray-400 dark:text-slate-500">
          #{String(id).padStart(3, '0')}
        </span>
        <button
          onClick={handleFavoriteClick}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Marcar como favorito"
        >
          <HiStar
            className={`h-6 w-6 transition-colors ${
              favorite ? 'text-yellow-400' : 'text-gray-300 dark:text-slate-600'
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
    })
  ).isRequired,
  favorite: PropTypes.bool.isRequired,
  index: PropTypes.number,
};

export default PokemonCard;