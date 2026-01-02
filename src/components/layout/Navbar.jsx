
import { useTheme } from "@/features/theme";
import logoPokemon from "@/assets/logo.svg";
import { HiSun, HiMoon } from "react-icons/hi";

/**
 * Navbar component for the application.
 * Handles theme switching and displays the logo.
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
