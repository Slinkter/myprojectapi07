import React from "react";
import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

/**
 * @typedef {Object} BillingCardProps
 * @property {React.ReactNode} icon - Icon for the card header.
 * @property {string} title - Main title of the billing card.
 * @property {string} detail - Secondary detail/subtitle.
 * @property {Object.<string, string>} options - Key-value pairs for additional details to display.
 */

/**
 * BillingCard component displays a single billing entry with details and action buttons.
 * This component is an entity as it represents a specific piece of business data.
 * @param {BillingCardProps} props - The component props.
 * @returns {JSX.Element} The BillingCard component.
 */
const BillingCard = ({ icon, title, detail, options }) => {
    return (
        <div className="flex flex-col gap-4 rounded-lg border border-blue-gray-50 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-gray-50">
                        {icon}
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            {title}
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                        >
                            {detail}
                        </Typography>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Tooltip content="Edit">
                        <IconButton variant="text" color="blue-gray">
                            <PencilIcon className="h-5 w-5" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete">
                        <IconButton variant="text" color="red">
                            <TrashIcon className="h-5 w-5" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {Object.entries(options).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                        >
                            {key}:
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                        >
                            {value}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BillingCard;
