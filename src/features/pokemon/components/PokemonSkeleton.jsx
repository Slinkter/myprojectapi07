import { motion } from "motion/react";
import { HiStar } from "react-icons/hi";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

const skeletonVariants = {
    initial: { opacity: 0.6 },
    animate: {
        opacity: [0.6, 1, 0.6],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
        x: "100%",
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

const PokemonSkeleton = () => {
    const reducedMotion = useReducedMotion();

    return (
    <motion.div
        variants={skeletonVariants}
        initial="initial"
        animate={reducedMotion ? false : "animate"}
        role="status"
        aria-label="Cargando Pokémon"
        className="h-full flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden"
    >
        <div className="flex justify-between items-center p-4">
            <div className="h-4 w-10 bg-gray-200 dark:bg-slate-700 rounded-md overflow-hidden relative">
                <motion.div
                    variants={shimmerVariants}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
            </div>
            <div className="p-1">
                <HiStar className="h-5 w-5 text-gray-200 dark:bg-slate-700 rounded-full" />
            </div>
        </div>

        <div className="flex-grow flex flex-col justify-center items-center py-4 px-6">
            <div className="h-32 w-32 bg-gray-200 dark:bg-slate-700 rounded-xl mb-4 overflow-hidden relative">
                <motion.div
                    variants={shimmerVariants}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
            </div>
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded-md overflow-hidden relative">
                <motion.div
                    variants={shimmerVariants}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
            </div>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-700">
            <div className="flex flex-wrap justify-center gap-2">
                <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                    <motion.div
                        variants={shimmerVariants}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                </div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                    <motion.div
                        variants={shimmerVariants}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                </div>
            </div>
        </div>
        <span className="sr-only">Cargando Pokémon...</span>
    </motion.div>
);
};

export default PokemonSkeleton;