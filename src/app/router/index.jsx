/**
 * @module app/router
 * @description Configuración de rutas de la aplicación.
 */

import { lazy, Suspense } from "react";
import { createHashRouter } from "react-router-dom";
import { PokemonSkeleton } from "@/features/pokemon";
import ErrorPage from "./ErrorPage";
import MainLayout from "./MainLayout";
import DetailLayout from "./DetailLayout";

const PokedexPage = lazy(() => import("@/pages/PokedexPage"));
const PokemonDetailPage = lazy(() => import("@/pages/PokemonDetailPage"));

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