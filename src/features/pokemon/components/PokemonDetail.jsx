import PropTypes from "prop-types";
import { memo } from "react";
import { motion } from "motion/react";
import { TYPE_COLORS } from "@/utils/constants";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

const getTypeColor = (typeName) => TYPE_COLORS[typeName] || "bg-gray-400";

const StatBar = memo(function StatBar({ name, value, max = 255, index }) {
    const percentage = Math.min((value / max) * 100, 100);
    const getColor = () => {
        if (percentage >= 80) return "bg-green-500";
        if (percentage >= 50) return "bg-yellow-400";
        return "bg-red-500";
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-3 mb-3"
        >
            <span className="w-20 sm:w-24 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase truncate">
                {name}
            </span>
            <motion.div 
                className="flex-1 bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden"
            >
                <motion.div
                    className={`h-full rounded-full ${getColor()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                />
            </motion.div>
            <span className="w-8 text-xs sm:text-sm font-bold text-gray-700 dark:text-slate-300 text-right">
                {value}
            </span>
        </motion.div>
    );
});

StatBar.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    max: PropTypes.number,
    index: PropTypes.number.isRequired,
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

const imageVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -10 },
    animate: { 
        scale: 1, 
        opacity: 1, 
        rotate: 0,
        transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.1 }
    },
    hover: { 
        scale: 1.05,
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.5 }
    }
};

const typeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: 0.2 + i * 0.1, type: "spring", stiffness: 300 }
    })
};

const PokemonDetail = memo(function PokemonDetail({ pokemon }) {
    const reducedMotion = useReducedMotion();

    if (!pokemon) return null;

    const { id, name, types, sprites, stats } = pokemon;
    const spriteUrl = sprites?.other?.["official-artwork"]?.front_default || sprites?.front_default;

    return (
        <motion.div
            variants={cardVariants}
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? false : "visible"}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl"
        >
            <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
                    <motion.div
                        variants={imageVariants}
                        initial={reducedMotion ? false : "initial"}
                        animate={reducedMotion ? false : "animate"}
                        whileHover={reducedMotion ? undefined : "hover"}
                        className="flex-shrink-0"
                    >
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64">
                            <img
                                src={spriteUrl}
                                alt={`${name} Pokémon sprite`}
                                role="img"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>

                    <div className="flex-1 text-center md:text-left">
                        <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 }}
                            className="text-xs sm:text-sm font-bold tracking-widest text-gray-400 dark:text-slate-500 uppercase"
                        >
                            #{String(id).padStart(3, "0")}
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white capitalize mt-1 sm:mt-2 mb-3 sm:mb-4"
                        >
                            {name}
                        </motion.h1>
                        <motion.div 
                            className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3"
                            initial="hidden"
                            animate="visible"
                        >
                            {types.map((type, index) => (
                                <motion.span
                                    key={index}
                                    variants={typeVariants}
                                    custom={index}
                                    className={`px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold capitalize rounded-full text-white shadow-md ${getTypeColor(
                                        typeof type === "string" ? type : type.type?.name
                                    )}`}
                                >
                                    {typeof type === "string" ? type : type.type?.name}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {stats && stats.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700"
                >
                    <motion.h2 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
                    >
                        Estadísticas
                    </motion.h2>
                    <div className="space-y-1 sm:space-y-2">
                        {stats.map((stat, index) => (
                            <StatBar
                                key={index}
                                index={index}
                                name={stat.stat?.name?.replace("-", " ") || stat.name}
                                value={stat.base_stat || stat.value || 0}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
});

PokemonDetail.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    type: PropTypes.shape({
                        name: PropTypes.string.isRequired,
                    }),
                }),
            ])
        ).isRequired,
        sprites: PropTypes.shape({
            front_default: PropTypes.string,
            other: PropTypes.shape({
                "official-artwork": PropTypes.shape({
                    front_default: PropTypes.string,
                }),
            }),
        }),
        stats: PropTypes.arrayOf(
            PropTypes.shape({
                stat: PropTypes.shape({
                    name: PropTypes.string,
                }),
                base_stat: PropTypes.number,
            })
        ),
    }).isRequired,
};

export default PokemonDetail;