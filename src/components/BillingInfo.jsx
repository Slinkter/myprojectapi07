import { PlusIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";

const BillingInfo = () => {
    return (
        <>
            <div className="w-full mb-2">
                <Typography className="!font-bold" color="blue">
                    Billing Information
                </Typography>
                <Typography
                    className="mt-1 !font-normal !text-gray-600"
                    variant="small"
                >
                    View and update your billing details quickly and easily.
                </Typography>
            </div>
            <div className="w-full">
                <Button
                    size="sm"
                    variant="outlined"
                    color="gray"
                    className="flex justify-center gap-3 md:max-w-fit w-full ml-auto"
                >
                    <PlusIcon strokeWidth={3} className="h-4 w-4" />
                    add new card
                </Button>
            </div>
        </>
    );
};

export default BillingInfo;
