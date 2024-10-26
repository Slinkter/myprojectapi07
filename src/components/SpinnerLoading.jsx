import { Spinner } from "@material-tailwind/react";
import React from "react";

const SpinnerLoading = () => {
    return (
        <div className="flex  flex-row flex-wrap gap-6 justify-center items-center h-dvh">
            <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
    );
};

export default SpinnerLoading;
