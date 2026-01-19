import { Suspense, lazy } from "react";
import { PokemonSkeleton } from "@/features/pokemon";

// Lazy loading for pages
const PokedexPage = lazy(() => import("@/pages/PokedexPage"));

/**
 * Componente AppRoutes.
 *
 * **Funcionalidad:**
 * * Define la estructura de navegación de la aplicación.
 * * Gestiona la carga perezosa (Lazy Loading) de las vistas para mejorar el rendimiento inicial.
 * * Provee un fallback visual (Skeleton) mientras se cargan los chunks de código.
 *
 * **Flujo de interacción / ejecución:**
 * 1. Importa dinámicamente `PokedexPage` usando `React.lazy`.
 * 2. Envuelve la renderización en `<Suspense>` para capturar el estado de carga del módulo.
 * 3. Renderiza `PokemonSkeleton` centrado como indicador de carga inicial.
 * 4. Muestra la página principal una vez el bundle JS ha sido descargado.
 *
 * **Estado y efectos secundarios:**
 * * No maneja estado propio. Depende del ciclo de vida de carga de módulos de React/Vite.
 *
 * @returns {JSX.Element} Contenedor de rutas con soporte para Suspense.
 */
const AppRoutes = () => {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900">
                    <div className="w-full max-w-sm p-4">
                        <PokemonSkeleton />
                    </div>
                </div>
            }
        >
            {/* Since there's no router library installed yet (react-router-dom), 
          we render the main page directly. This stays scalable for when 
          the USER decides to add more routes. */}
            <PokedexPage />
        </Suspense>
    );
};

export default AppRoutes;
