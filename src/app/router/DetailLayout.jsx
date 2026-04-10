/**
 * @module app/router/DetailLayout
 * @description Layout para página de detalles (sin Navbar).
 */

import { Outlet } from "react-router-dom";

const DetailLayout = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Outlet />
    </div>
);

export default DetailLayout;