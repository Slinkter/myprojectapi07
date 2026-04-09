/**
 * @module app/router
 * @description Configuración de rutas de la aplicación.
 */

import { lazy, Suspense } from "react";
import { createHashRouter, Outlet } from "react-router-dom";
import { PokemonSkeleton } from "@/features/pokemon";
import Navbar from "@/shared/components/layout/Navbar";

const PokedexPage = lazy(() => import("@/pages/PokedexPage"));
const PokemonDetailPage = lazy(() => import("@/pages/PokemonDetailPage"));

const ErrorPage = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-4">Página no encontrada</h2>
        <a 
            href="/myprojectapi07/" 
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-red-600 transition-colors"
        >
            Volver al inicio
        </a>
    </div>
);

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

const router = createHashRouter(
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
        {
            path: "*",
            element: <ErrorPage />,
        },
    ]
);

export default router;