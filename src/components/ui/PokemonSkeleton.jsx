import { Card, Skeleton } from "@mui/material";

export const PokemonSkeleton = () => (
    <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
            <Skeleton variant="rectangular" width="100%" height={256} />
            <div className="p-4 space-y-4">
                <Skeleton variant="text" width="50%" className="mx-auto" />
                <Skeleton variant="text" width="75%" className="mx-auto" />
                <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    className="mx-auto"
                />
            </div>
        </Card>
    </div>
);
