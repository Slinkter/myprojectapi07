import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PokemonSkeleton } from "@/features/pokemon";
import MainLayout from "@/shared/components/layout/MainLayout.jsx";

// Carga perezosa (Lazy Loading) de las páginas para optimizar el rendimiento inicial.
// El código de PokedexPage no se incluirá en el bundle principal y se cargará bajo demanda.
const PokedexPage = lazy(() => import("@/pages/PokedexPage"));

/**
 * @component AppRoutes
 * @description
 * Componente central de enrutamiento que define la estructura de navegación de la aplicación.
 *
 * **Responsabilidades:**
 * 1.  **Mapa de Rutas:** Define la relación entre URLs y componentes.
 * 2.  **Estructura Jerárquica:** Implementa layouts anidados (`MainLayout`).
 * 3.  **Optimización:** Gestiona la carga perezosa (Lazy Loading) de las páginas.
 *
 * **Efectos Secundarios:**
 * - Carga asíncrona de archivos JavaScript (chunks) al navegar a rutas lazy.
 *
 * @returns {JSX.Element} El sistema de enrutamiento principal de la aplicación.
 *
 * @returns {JSX.Element} El sistema de enrutamiento principal de la aplicación.
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
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<PokedexPage />} />
                    {/* Aquí se pueden añadir más rutas que compartan el MainLayout,
              por ejemplo: /pokemon/:id, /favorites, etc. */}
                </Route>
                {/* Aquí se podrían añadir otras rutas con layouts diferentes,
            por ejemplo: /login, /404, etc. */}
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
