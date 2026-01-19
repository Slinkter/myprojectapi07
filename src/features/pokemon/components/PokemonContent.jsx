import PropTypes from "prop-types";
import { HiExclamationCircle, HiRefresh } from "react-icons/hi";
import PokemonSkeleton from "./PokemonSkeleton";
import PokemonList from "./PokemonList";

/**
 * Componente `PokemonContent`.
 *
 * **Responsabilidad:**
 * * Maneja los estados visuales principales de la lista de contenido: Carga, Error, Vacío y Éxito.
 * * Decide qué componente hijo renderizar basándose en el estado de la petición (Pattern Matching visual).
 *
 * **Flujo:**
 * 1. Si `error` existe -> Muestra UI de Error con botón de reintento.
 * 2. Si `isLoading` es true -> Muestra Grid de Skeletons.
 * 3. Si `pokemons` está vacío -> Muestra estado Empty.
 * 4. Si todo OK -> Renderiza `PokemonList`.
 *
 * @param {object} props
 * @param {boolean} props.isLoading - Bandera de carga.
 * @param {string|null} props.error - Mensaje de error si existe.
 * @param {Array} props.pokemons - Lista de datos a mostrar.
 * @param {Function} props.onRetry - Callback para reintentar la acción fallida.
 */
const PokemonContent = ({ isLoading, error, pokemons, onRetry }) => {
    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-6 rounded-2xl flex flex-col items-center gap-4 text-center">
                <HiExclamationCircle className="text-red-500 h-12 w-12" />
                <div>
                    <h3 className="text-red-800 dark:text-red-400 font-bold text-lg">
                        Error de Carga
                    </h3>
                    <p className="text-red-700 dark:text-red-500/80">
                        {" "}
                        {error}
                    </p>
                </div>
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95"
                >
                    <HiRefresh /> Reintentar
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {[...Array(12)].map((_, index) => (
                    <PokemonSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (pokemons.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700">
                <p className="text-gray-500 dark:text-slate-400 text-lg font-medium">
                    No se encontraron Pokémon que coincidan con tu búsqueda.
                </p>
            </div>
        );
    }

    return <PokemonList pokemons={pokemons} />;
};

PokemonContent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    pokemons: PropTypes.array.isRequired,
    onRetry: PropTypes.func.isRequired,
};

export default PokemonContent;
