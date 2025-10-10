import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import BillingCard from "./features/billing/components/BillingCard"; // Corrected path
import BillingInfo from "./features/billing/components/BillingInfo"; // Corrected path

/**
 * @typedef {Object} BillingPageProps
 * @description Props for the BillingPage component.
 */

/**
 * BillingPage component displays billing information and a list of billing cards.
 * It serves as a full page/view for managing billing details.
 * @param {BillingPageProps} props - The component props.
 * @returns {JSX.Element} The BillingPage component.
 */
const BillingPage = () => {
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
    return (
        <div>
            {" "}
            <section className="max-w-4xl !mx-auto px-4 py-10 w-full ">
                <Card shadow={"lg"} color="">
                    <CardHeader // Changed to use BillingInfo
                        floated={false}
                        shadow={false}
                        className="rounded-none flex  flex-col gap-2 md:flex-row items-start !justify-between"
                    >
                        {" "}
                        {/* BillingInfo is now an entity */}
                        <BillingInfo />
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4 !p-4">
                        {billingCardData.map((props, key) => (
                            <BillingCard key={key} {...props} />
                        ))}
                    </CardBody>
                </Card>
            </section>
        </div>
    );
};

export default BillingPage; // Renamed from BillingApp to BillingPage
