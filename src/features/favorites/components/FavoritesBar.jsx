import PropTypes from "prop-types";
import FavoritePokemon from "./FavoritePokemon";

/**
 * @component FavoritesBar
 * @description
 * Un componente de presentación que muestra una lista visual de los Pokémon
 * que han sido marcados como favoritos.
 *
 * **Responsabilidades:**
 * 1.  **Visualización de Favoritos:** Renderiza una "píldora" (pill) para cada Pokémon
 *     en la lista `favoritePokemons`, mostrando su imagen y nombre.
 * 2.  **Manejo del Estado Vacío:** Si la lista de `favoritePokemons` está vacía, muestra
 *     un mensaje indicando que no se han seleccionado favoritos.
 *
 * **Efectos Secundarios:**
 * - No tiene efectos secundarios a otros archivos o funciones (es un componente puro de presentación).
 *
 * @param {object} props - Las props del componente.
 * @param {Array<object>} props.favoritePokemons - Un array de objetos Pokémon que han sido
 *   filtrados previamente como favoritos.
 *
 * @returns {JSX.Element} Un `div` que contiene la barra de favoritos.
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
                        <FavoritePokemon key={fav.id} fav={fav} />
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
        }),
    ).isRequired,
};

export default FavoritesBar;
