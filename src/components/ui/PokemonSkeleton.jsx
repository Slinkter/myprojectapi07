import React from "react";
import { Card } from "@material-tailwind/react";

export const PokemonSkeleton = () => (
    <Card className="w-96 animate-pulse">
        <div className="h-80 bg-gray-200 rounded-t-xl" />
        <div className="p-4 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
            <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto" />
        </div>
    </Card>
);
