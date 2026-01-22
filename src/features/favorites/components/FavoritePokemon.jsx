

const FavoritePokemon = (fav) => {
    return (
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
    );
};

export default FavoritePokemon;
