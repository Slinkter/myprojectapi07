import React from "react";
import { Typography } from "@material-tailwind/react";

/**
 * @typedef {Object} BillingInfoProps
 * @description Props for the BillingInfo component.
 */

/**
 * BillingInfo component displays basic billing information header.
 * This component is an entity as it represents a specific piece of business data/context.
 * @param {BillingInfoProps} props - The component props.
 * @returns {JSX.Element} The BillingInfo component.
 */
const BillingInfo = () => {
    return (
        <div>
            <Typography variant="h5" color="blue-gray">
                Billing Information
            </Typography>
            <Typography
                variant="small"
                className="text-gray-600 font-normal mt-1"
            >
                Manage your billing details and payment methods.
            </Typography>
        </div>
    );
};

export default BillingInfo;
