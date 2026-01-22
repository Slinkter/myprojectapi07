import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/layout/Navbar.jsx";

/**
 * @component MainLayout
 * @description
 * Un componente de layout que proporciona una estructura visual consistente para las páginas
 * principales de la aplicación, como la barra de navegación.
 *
 * **Responsabilidades:**
 * 1.  **Estructura Base:** Define el layout visual padre (Navbar + Contenido).
 * 2.  **Enrutamiento Anidado:** Renderiza las rutas hijas a través de `<Outlet />`.
 *
 * **Efectos Secundarios:**
 * - No tiene efectos secundarios propios.
 *
 * @example
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
