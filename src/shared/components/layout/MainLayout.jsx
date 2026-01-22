import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/layout/Navbar.jsx";

/**
 * @component MainLayout
 * @description
 * Un componente de layout que proporciona una estructura visual consistente para las páginas
 * principales de la aplicación, como la barra de navegación.
 *
 * **Arquitectura (Patrón de Layout de Rutas):**
 * Este componente está diseñado para ser usado en la prop `element` de una `<Route>` de
 * `react-router-dom`. Renderiza una UI común (ej. `<Navbar />`) y luego utiliza el
 * componente `<Outlet />` para renderizar el componente de la ruta anidada que coincida
 * con la URL actual.
 *
 * @example
 * ```jsx
 * <Route path="/" element={<MainLayout />}>
 *   <Route index element={<HomePage />} />
 *   <Route path="about" element={<AboutPage />} />
 * </Route>
 * ```
 * En este ejemplo, tanto `HomePage` como `AboutPage` se renderizarán dentro de `MainLayout`,
 * compartiendo así la misma `Navbar`.
 *
 * @returns {JSX.Element} Un `div` que envuelve la Navbar y el contenido de la página actual.
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
