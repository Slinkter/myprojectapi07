/**
 * @module app/router
 * @description Configuración de rutas de la aplicación.
 */

import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { PokemonSkeleton } from "@/features/pokemon";
import Navbar from "@/shared/components/layout/Navbar";

const PokedexPage = lazy(() => import("@/pages/PokedexPage"));
const PokemonDetailPage = lazy(() => import("@/pages/PokemonDetailPage"));

const MainLayout = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        <main>
            <Outlet />
        </main>
    </div>
);

const DetailLayout = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Outlet />
    </div>
);

const router = createBrowserRouter(
    [
        {
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: (
                        <Suspense fallback={<PokemonSkeleton />}>
                            <PokedexPage />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            element: <DetailLayout />,
            children: [
                {
                    path: "pokemon/:id",
                    element: (
                        <Suspense fallback={<PokemonSkeleton />}>
                            <PokemonDetailPage />
                        </Suspense>
                    ),
                },
            ],
        },
    ],
    {
        basename: "/myprojectapi07",
    }
);

export default router;