/**
 * @component PokedexHeader
 * @description
 * Un componente de presentación estático que renderiza el encabezado principal
 * de la página Pokédex, incluyendo el título y el subtítulo.
 *
 * **Responsabilidades:**
 * 1. **Información:** Muestra el título y subtítulo de la aplicación.
 *
 * **Efectos Secundarios:**
 * - No tiene efectos secundarios a otros archivos o funciones (componente estático).
 *
 * @returns {JSX.Element} Un `div` con el título y subtítulo de la página.
 */
const PokedexHeader = () => {
    return (
        <div className="text-center space-y-2">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Pokédex
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-500 dark:text-slate-400">
                Gotta Catch &apos;Em All!
            </p>
        </div>
    );
};

export default PokedexHeader;
