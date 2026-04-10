/**
 * @module app/router/MainLayout
 * @description Layout principal con Navbar.
 */

import { Outlet } from "react-router-dom";
import Navbar from "@/shared/components/layout/Navbar";
import GlobalErrorBoundary from "@/shared/components/layout/GlobalErrorBoundary";
import { LAYOUT } from "@/utils/constants";

const MainLayout = () => (
    <div className={LAYOUT.ROOT_CLASSES}>
        <Navbar />
        <main>
            <GlobalErrorBoundary>
                <Outlet />
            </GlobalErrorBoundary>
        </main>
    </div>
);

export default MainLayout;