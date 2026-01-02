
/**
 * PokedexHeader component for the main title and subtitle.
 */
const PokedexHeader = () => {
    return (
        <div className="text-center space-y-2">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Pokédex
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-500 dark:text-slate-400">
                Gotta Catch &apos;Em All!
            </p>
        </div>
    );
};

export default PokedexHeader;
