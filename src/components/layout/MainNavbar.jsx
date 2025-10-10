import { Link } from "react-router-dom";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { ROUTES } from "../../utils/constants";

/**
 * MainNavbar component - The main navigation bar of the application
 * @returns {JSX.Element} The MainNavbar component
 */
export const MainNavbar = () => {
    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as={Link}
                    to={ROUTES.HOME}
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    MyProjectAPI07
                </Typography>
                <div className="hidden lg:block">
                    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        <Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="p-1 font-normal"
                        >
                            <Link
                                to={ROUTES.HOME}
                                className="flex items-center hover:text-blue-500 transition-colors"
                            >
                                Home
                            </Link>
                        </Typography>
                        <Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="p-1 font-normal"
                        >
                            <Link
                                to={ROUTES.ACCOUNT}
                                className="flex items-center hover:text-blue-500 transition-colors"
                            >
                                Account
                            </Link>
                        </Typography>
                        <Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="p-1 font-normal"
                        >
                            <Link
                                to={ROUTES.WEB3}
                                className="flex items-center hover:text-blue-500 transition-colors"
                            >
                                Web3
                            </Link>
                        </Typography>
                    </ul>
                </div>
                <Button variant="gradient" size="sm">
                    <Link to={ROUTES.BILLING} className="text-white">
                        Buy Now
                    </Link>
                </Button>
            </div>
        </Navbar>
    );
};
