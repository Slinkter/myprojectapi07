import { motion } from "motion/react";

const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    }
};

const subtitleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { delay: 0.2, duration: 0.5 }
    }
};

const letterVariants = {
    hover: { 
        y: -5, 
        transition: { type: "spring", stiffness: 400, damping: 10 }
    }
};

const PokedexHeader = () => {
    const title = "Pokédex";
    const letters = title.split("");

    return (
        <div className="text-center space-y-1 sm:space-y-2">
            <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight flex justify-center gap-0.5 sm:gap-1"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
            >
                {letters.map((letter, i) => (
                    <motion.span
                        key={i}
                        variants={letterVariants}
                        whileHover="hover"
                        className="inline-block"
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.h1>
            <motion.p 
                className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-500 dark:text-slate-400"
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
            >
                Gotta Catch &apos;Em All!
            </motion.p>
        </div>
    );
};

export default PokedexHeader;
