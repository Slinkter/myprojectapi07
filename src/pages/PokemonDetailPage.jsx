import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { pokemonApi } from "@/features/pokemon/api/pokemonApi";
import PokemonDetail from "@/features/pokemon/components/PokemonDetail";
import { PokemonSkeleton } from "@/features/pokemon";
import { HiArrowLeft } from "react-icons/hi";

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { 
        opacity: 1, 
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    },
    exit: { 
        opacity: 0, 
        x: -50,
        transition: { duration: 0.2 }
    }
};

const backButtonVariants = {
    hover: { x: -5, scale: 1.05 },
    tap: { scale: 0.95 }
};

const PokemonDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await pokemonApi.getPokemonDetails(id);
                if (!data || data.id === 0) {
                    setError("Pokémon no encontrado");
                } else {
                    setPokemon(data);
                }
            } catch (err) {
                setError("Error al cargar el Pokémon");
            } finally {
                setLoading(false);
            }
        };
        fetchPokemon();
    }, [id]);

    const handleBack = () => {
        navigate("/");
    };

    if (loading) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-900 p-4"
            >
                <div className="w-full max-w-md">
                    <PokemonSkeleton />
                </div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-4"
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-center mb-6"
                >
                    <h2 className="text-2xl font-bold text-red-500">{error}</h2>
                </motion.div>
                <motion.button
                    onClick={handleBack}
                    whileHover="hover"
                    whileTap="tap"
                    variants={backButtonVariants}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                    <HiArrowLeft className="w-5 h-5" />
                    Volver al Pokedex
                </motion.button>
            </motion.div>
        );
    }

    return (
        <motion.div 
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-4 md:p-8"
        >
            <div className="max-w-2xl mx-auto">
                <motion.button
                    onClick={handleBack}
                    whileHover="hover"
                    whileTap="tap"
                    variants={backButtonVariants}
                    className="flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-2 text-gray-600 dark:text-slate-400 hover:text-primary transition-colors"
                >
                    <HiArrowLeft className="w-5 h-5" />
                    <span className="text-sm sm:text-base">Volver</span>
                </motion.button>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pokemon.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PokemonDetail pokemon={pokemon} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default PokemonDetailPage;