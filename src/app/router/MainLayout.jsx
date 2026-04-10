/**
 * @module app/router/MainLayout
 * @description Layout principal con Navbar.
 */

import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/layout/Navbar";

const MainLayout = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        <main>
            <Outlet />
        </main>
    </div>
);

export default MainLayout;