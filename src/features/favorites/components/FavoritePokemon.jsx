
/**
 * @component FavoritePokemon
 * @description
 * Un componente de presentación que muestra un Pokémon favorito individual
 * con su imagen y nombre, diseñado para ser parte de una lista de favoritos.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.fav - El objeto Pokémon favorito a mostrar.
 * @param {number} props.fav.id - El ID del Pokémon.
 * @param {string} props.fav.name - El nombre del Pokémon.
 * @param {object} props.fav.sprites - Objeto de sprites del Pokémon.
 * @param {string} props.fav.sprites.front_default - URL del sprite frontal del Pokémon.
 *
 * @returns {JSX.Element} Un `div` estilizado que contiene la imagen y el nombre del Pokémon.
 */
const FavoritePokemon = (fav) => {
    return (
        <div
            key={fav.id}
            className="inline-flex items-center gap-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 border border-transparent rounded-full px-3 py-1 transition-colors group cursor-default"
        >
            <img
                src={fav.sprites?.front_default || '/placeholder-pokemon.png'}
                alt={fav.name}
                className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-200">
                {fav.name}
            </span>
        </div>
    );
};

export default FavoritePokemon;
