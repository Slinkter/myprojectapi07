import { useSearch } from "@/features/search";
import { HiSearch } from "react-icons/hi";

/**
 * @component SearchBar
 * @description Un componente que proporciona una barra de búsqueda para filtrar Pokémon.
 * Utiliza el hook `useSearch` para obtener el valor actual del filtro y la función para actualizarlo.
 * El estado se actualiza en cada cambio del input.
 *
 * **Responsabilidades:**
 * 1.  **Entrada de Usuario:** Captura el texto introducido por el usuario.
 * 2.  **Sincronización:** Actualiza el estado global de búsqueda en tiempo real via `useSearch`.
 *
 * **Efectos Secundarios:**
 * - Al escribir, invoca `filterPokemons`, disparando actualizaciones de estado en Redux.
 *
 * @returns {JSX.Element} Un elemento `div` que contiene un input de texto estilizado para la búsqueda.
 */
export const SearchBar = () => {
    const { searchFilter, filterPokemons } = useSearch();

    /**
     * Maneja el evento de cambio del input de búsqueda.
     * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio.
     */
    const handleSearchChange = (e) => {
        filterPokemons(e.target.value);
    };

    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
                type="text"
                placeholder="Buscar Pokémon..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm transition-all shadow-sm"
                value={searchFilter}
                onChange={handleSearchChange}
            />
        </div>
    );
};
