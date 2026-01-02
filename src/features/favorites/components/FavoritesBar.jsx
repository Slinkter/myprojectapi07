
import PropTypes from "prop-types";

/**
 * FavoritesBar component to display selected favorite Pokémon.
 * @param {Object} props - Component props.
 * @param {Array} props.favoritePokemons - List of favorite Pokémon objects.
 */
const FavoritesBar = ({ favoritePokemons }) => {
    return (
        <div className="w-full max-w-3xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Favoritos
            </h3>
            <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
                {favoritePokemons.length > 0 ? (
                    favoritePokemons.map((fav) => (
                        <div
                            key={fav.id}
                            className="inline-flex items-center gap-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 border border-transparent rounded-full px-3 py-1 transition-colors group cursor-default"
                        >
                            <img
                                src={fav.sprites.front_default}
                                alt={fav.name}
                                className="w-6 h-6 object-contain"
                            />
                            <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-200">
                                {fav.name}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        No has seleccionado ningún Pokémon favorito.
                    </p>
                )}
            </div>
        </div>
    );
};

FavoritesBar.propTypes = {
    favoritePokemons: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            sprites: PropTypes.shape({
                front_default: PropTypes.string,
            }).isRequired,
        })
    ).isRequired,
};

export default FavoritesBar;
