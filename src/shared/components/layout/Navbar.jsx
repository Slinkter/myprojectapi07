import { useTheme } from "@/features/theme";
/* import logoPokemon from "@/assets/logo.svg"; */
import { HiSun, HiMoon } from "react-icons/hi";

/**
 * @component Navbar
 * @description
 * El componente de la barra de navegación principal de la aplicación. Es una barra
 * persistente que se muestra en la parte superior de las páginas que utilizan `MainLayout`.
 *
 * **Responsabilidades:**
 * 1.  **Identidad de Marca:** Muestra el logotipo y nombre de la aplicación.
 * 2.  **Controles Globales:** Proporciona acceso rápido a configuraciones globales (tema).
 *
 * **Efectos Secundarios:**
 * - Invoca `toggleAppTheme`, que modifica el estado de Redux y el `localStorage`.
 *
 * @returns {JSX.Element} El elemento `<nav>` que representa la barra de navegación.
 */
const Navbar = () => {
    const { currentTheme, toggleAppTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex  mx-auto  justify-center h-16">
                    <div className="flex items-center">
                        <button
                            onClick={toggleAppTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none transition-colors duration-200"
                            aria-label="Alternar tema"
                        >
                            {currentTheme === "dark" ? (
                                <HiSun size={24} className="text-gray-100" />
                            ) : (
                                <HiMoon size={24} className="text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
