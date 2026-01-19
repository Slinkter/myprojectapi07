import { useTheme } from "@/features/theme";
import logoPokemon from "@/assets/logo.svg";
import { HiSun, HiMoon } from "react-icons/hi";

/**
 * Componente Navbar.
 *
 * **Funcionalidad:**
 * * Renderiza la barra de navegación superior de la aplicación.
 * * Contiene el logotipo de la marca y el control de cambio de tema.
 * * Proporciona acceso rápido a configuraciones globales persistentes como el modo oscuro.
 *
 * **Flujo de interacción / ejecución:**
 * 1. Obtiene el estado del tema (`currentTheme`) y la función toggle (`toggleAppTheme`) desde `useTheme`.
 * 2. Renderiza una estructura `nav` sticky que permanece visible al hacer scroll.
 * 3. Al hacer clic en el botón del sol/luna, invoca `toggleAppTheme` para cambiar el contexto global de estilos.
 *
 * **Estado y efectos secundarios:**
 * * Consume el contexto de tema (`ThemeContext`). No maneja estado local propio.
 *
 * @returns {JSX.Element} Elemento de navegación con logo y switch de tema.
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
