import { HiStar } from "react-icons/hi";

/**
 * @component PokemonSkeleton
 * @description
 * Un componente de presentación que renderiza un "esqueleto" o "placeholder" visual
 * con la forma de una `PokemonCard`.
 *
 * **Propósito (UX):**
 * Se utiliza para indicar un estado de carga. En lugar de mostrar un spinner, muestra
 * una versión simplificada y sin contenido de la tarjeta, lo que ayuda a gestionar las
 * expectativas del usuario sobre la estructura del contenido que está por aparecer y
 * reduce la percepción del tiempo de carga.
 *
 * @returns {JSX.Element} Un `div` que representa la tarjeta de esqueleto.
 */
const PokemonSkeleton = () => (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden animate-pulse">
        {/* --- SKELETON HEADER --- */}
        <div className="flex justify-between items-center p-4">
            <div className="h-4 w-10 bg-gray-200 dark:bg-slate-700 rounded-md"></div>
            <div className="p-1">
                <HiStar className="h-5 w-5 text-gray-200 dark:bg-slate-700 rounded-full" />
            </div>
        </div>

        {/* --- SKELETON BODY --- */}
        <div className="flex-grow flex flex-col justify-center items-center py-4 px-6">
            <div className="h-32 w-32 bg-gray-200 dark:bg-slate-700 rounded-xl mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded-md"></div>
        </div>

        {/* --- SKELETON FOOTER --- */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-700">
            <div className="flex flex-wrap justify-center gap-2">
                <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
            </div>
        </div>
    </div>
);

export default PokemonSkeleton;
