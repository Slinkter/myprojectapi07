import { useFavorites } from '../../hooks/useFavorites';
import PropTypes from 'prop-types';

// Un componente simple para el ícono de estrella
const StarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.212l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);


const PokemonCard = ({ id, name, image, favorite }) => {
  const { togglePokemonFavorite } = useFavorites();

  // Evita que el click en el botón se propague a la tarjeta
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePokemonFavorite(id);
  };

  return (
    <div className="group relative cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 z-20 rounded-full bg-white/30 p-1.5 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0"
        aria-label="Marcar como favorito"
      >
        <StarIcon
          className={`h-6 w-6 transition-colors ${
            favorite
              ? 'text-yellow-400'
              : 'text-gray-300 hover:text-yellow-300'
          }`}
        />
      </button>

      <img
        src={image}
        alt={`Imagen de ${name}`}
        className="mx-auto h-24 w-24 transition-transform duration-300 group-hover:scale-110 sm:h-28 sm:w-28"
        loading="lazy"
      />
      <div className="mt-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">#{String(id).padStart(3, '0')}</p>
        <h3 className="mt-1 text-lg font-bold capitalize text-gray-800 dark:text-white">
          {name}
        </h3>
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default PokemonCard;