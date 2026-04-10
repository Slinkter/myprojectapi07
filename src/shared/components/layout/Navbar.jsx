import { useTheme } from "@/features/theme";
import { motion } from "motion/react";
import { HiSun, HiMoon } from "react-icons/hi";

const Navbar = () => {
    const { currentTheme, toggleAppTheme } = useTheme();

    return (
        <motion.nav
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            aria-label="Navegación principal"
            role="navigation"
            className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="flex justify-center h-14 sm:h-16">
                    <div className="flex items-center">
                        <motion.button
                            onClick={toggleAppTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Alternar tema"
                        >
                            {currentTheme === "dark" ? (
                                <HiSun size={24} className="text-gray-100" />
                            ) : (
                                <HiMoon size={24} className="text-gray-600" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
