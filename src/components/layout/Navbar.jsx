import { useTheme } from "@/features/theme";
import logoPokemon from "@/assets/logo.svg";
import { HiSun, HiMoon } from "react-icons/hi";

/**
 * @component Navbar
 * @description
 * El componente de la barra de navegación principal de la aplicación. Es una barra
 * persistente que se muestra en la parte superior de las páginas que utilizan `MainLayout`.
 *
 * **Responsabilidades:**
 * 1.  **Identidad de Marca:** Muestra el logotipo de la aplicación.
 * 2.  **Controles Globales:** Proporciona controles para acciones que afectan a toda la aplicación,
 *     como el botón para alternar entre el tema claro y oscuro.
 *
 * **Interacción:**
 * - Consume el hook `useTheme` para obtener el tema actual y la función para alternarlo.
 * - Al hacer clic en el botón de tema, invoca `toggleAppTheme` para cambiar el estado global del tema.
 *
 * @returns {JSX.Element} El elemento `<nav>` que representa la barra de navegación.
 */
const Navbar = () => {
    const { currentTheme, toggleAppTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            src={logoPokemon}
                            alt="Logo Pokémon"
                            className="h-10 w-auto"
                        />
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={toggleAppTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none transition-colors duration-200"
                            aria-label="Alternar tema"
                        >
                            {currentTheme === "dark" ? (
                                <HiSun size={24} className="text-yellow-400" />
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
