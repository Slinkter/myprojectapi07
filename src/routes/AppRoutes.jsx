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
 * **Arquitectura y Responsabilidades:**
 * 1.  **Definición de Rutas:** Utiliza `<Routes>` y `<Route>` de `react-router-dom` para mapear
 *     URLs a componentes de página específicos.
 * 2.  **Layouts Compartidos:** Implementa el patrón de layout anidado. La ruta principal `/`
 *     renderiza `MainLayout`, y todas las rutas hijas (como la `PokedexPage`) se renderizan
 *     dentro de `MainLayout`, compartiendo así una UI consistente (ej. Navbar).
 * 3.  **Code Splitting (Lazy Loading):** Las páginas (ej. `PokedexPage`) se cargan de forma perezosa
 *     usando `React.lazy()`. Esto mejora el rendimiento inicial de la aplicación, ya que el
 *     navegador solo descarga el código de la página cuando es estrictamente necesario.
 * 4.  **UI de Carga (Suspense):** Envuelve las rutas en un componente `<Suspense>` que muestra
 *     una UI de `fallback` (un skeleton) mientras el código de la página se está cargando,
 *     mejorando la experiencia del usuario.
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
