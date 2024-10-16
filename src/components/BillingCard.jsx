import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button, Card, Typography } from "@material-tailwind/react";
import React from "react";

const BillingCard = ({ title, options, icon, detail }) => {
    console.log(options);

    return (
        <Card shadow={false} className="rounded-lg border border-gray-400 !p-4">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3 ">
                    <div className="border border-gray-200 p-2.5 rounded-lg">
                        {icon}
                    </div>
                    <div className="">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-bold"
                        >
                            {title}
                        </Typography>
                        <Typography className="!text-gray-600 text-xs font-normal">
                            {detail}
                        </Typography>
                    </div>
                </div>

                <div className="flex items-center justify-between border-2">
                    <Button
                        size="sm"
                        variant="text"
                        className="flex items-center gap-2"
                    >
                        <PencilIcon className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button
                        size="sm"
                        variant="text"
                        color="red"
                        className="flex items-center gap-2"
                    >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            </div>
            <div>
                {options && (
                    <>
                        {Object.keys(options).map((label) => (
                            <div key={label} className="flex gap-1 border-2">
                                <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                                    {label}:
                                </Typography>
                                <Typography
                                    className="text-xs !font-bold"
                                    color="blue-gray"
                                >
                                    {options[label]}
                                </Typography>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </Card>
    );
};

export default BillingCard;
