
import { HiStar } from "react-icons/hi";

/**
 * A component that displays a skeleton loader for a Pokémon card.
 * It's used to provide a visual placeholder while the actual Pokémon data is loading.
 * @returns {JSX.Element} The rendered Pokémon skeleton card component.
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
