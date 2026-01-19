import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PokemonSkeleton } from "@/features/pokemon";
import MainLayout from "@/components/layout/MainLayout";

// Lazy loading for pages
const PokedexPage = lazy(() => import("@/pages/PokedexPage"));

/**
 * Componente AppRoutes.
 *
 * **Funcionalidad:**
 * * Define la estructura de navegación de la aplicación usando `react-router-dom`.
 * * Utiliza un `MainLayout` para rutas que comparten una estructura común (ej. Navbar).
 * * Gestiona la carga perezosa (Lazy Loading) de las vistas para mejorar el rendimiento inicial.
 * * Provee un fallback visual (Skeleton) mientras se cargan los chunks de código.
 *
 * @returns {JSX.Element} El componente de enrutamiento principal de la aplicación.
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
