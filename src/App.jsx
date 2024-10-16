import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import BillingCard from "./components/BillingCard";

const billingCardData = [
    {
        icon: <BriefcaseIcon className="h-6 w-6 text-gray-900" />,
        title: "Burrito Vikings",
        detail: "Company",
        options: {
            Contact: "Emma Roberts",
            "Email Address": "emma@mail.com",
            "VAT Number": "FRB1235476",
        },
    },
    {
        icon: <BriefcaseIcon className="h-6 w-6 text-gray-900" />,
        title: "Stone Tech Zone",
        detail: "Company",
        options: {
            Contact: "Marcel Glock",
            "Email Address": "marcel@mail.com",
            "VAT Number": "FRB1235476",
        },
    },
    {
        icon: <BriefcaseIcon className="h-6 w-6 text-gray-900" />,
        title: "Fiber Notion",
        detail: "Company",
        options: {
            Contact: "Misha Stam",
            "Email Address": "misha@mail.com",
            "VAT Number": "FRB1235476",
        },
    },
];

function App() {
    return (
        <section className="max-w-4xl !mx-auto px-8 py-20 w-full">
            <Card shadow={false}>
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none flex gap-2 flex-col md:flex-row items-start !justify-between"
                >
                    <div className="w-full mb-2">
                        <Typography className="!font-bold" color="blue-gray">
                            Billing Information
                        </Typography>
                        <Typography
                            className="mt-1 !font-normal !text-gray-600"
                            variant="small"
                        >
                            View and update your billing details quickly and
                            easily.
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
                </CardHeader>
                <CardBody className="flex flex-col gap-4 !p-4">
                    {billingCardData.map((props, key) => (
                        <BillingCard key={key} {...props} />
                    ))}
                </CardBody>
            </Card>
        </section>
    );
}

export default App;
