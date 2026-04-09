import { useSearch } from "@/features/search";
import { HiSearch } from "react-icons/hi";
import { motion, AnimatePresence } from "motion/react";

const inputVariants = {
    focus: { 
        boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.2)",
        borderColor: "#EF4444"
    },
    blur: { 
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        borderColor: "#D1D5DB"
    }
};

export const SearchBar = () => {
    const { searchFilter, filterPokemons } = useSearch();

    const handleSearchChange = (e) => {
        filterPokemons(e.target.value);
    };

    return (
        <motion.div 
            className="relative group w-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                <motion.div
                    animate={{ scale: searchFilter ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <HiSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </motion.div>
            </div>
            <motion.input
                type="text"
                placeholder="Buscar Pokémon..."
                className="block w-full pl-9 sm:pl-10 pr-8 sm:pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-slate-700 rounded-lg sm:rounded-xl leading-5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-all shadow-sm"
                value={searchFilter}
                onChange={handleSearchChange}
                variants={inputVariants}
                initial="blur"
                whileFocus="focus"
            />
            <AnimatePresence>
                {searchFilter && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => filterPokemons("")}
                        className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
