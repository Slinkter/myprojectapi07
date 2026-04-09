/**
 * @module app/router
 * @description Configuración de rutas de la aplicación.
 */

import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PokemonSkeleton } from "@/features/pokemon";
import MainLayout from "@/shared/components/layout/MainLayout";

const PokedexPage = lazy(() => import("@/pages/PokedexPage"));
const PokemonDetailPage = lazy(() => import("@/pages/PokemonDetailPage"));

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={<PokemonSkeleton />}>
                            <PokedexPage />
                        </Suspense>
                    ),
                },
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