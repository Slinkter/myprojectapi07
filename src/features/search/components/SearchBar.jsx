import { useSearch } from "@/features/search";
import { HiSearch } from "react-icons/hi";

/**
 * Componente `SearchBar`.
 *
 * **Responsabilidad:**
 * * Provee la interfaz de entrada para el filtrado global de Pokémon.
 * * Conecta el input de texto directamente con el hook `useSearch`.
 *
 * **Interacción:**
 * * Al escribir (`onChange`), dispara inmediatamente la actualización del filtro global.
 *
 * @returns {JSX.Element} Input estilizado con icono de búsqueda.
 */
export const SearchBar = () => {
    const { searchFilter, filterPokemons } = useSearch();

    /**
     * Handles the change event of the search input.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
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
