import PropTypes from "prop-types";
import { MainNavbar } from "./MainNavbar";
import { Footer } from "./Footer";

/**
 * Layout component that wraps the entire application
 * Provides consistent layout structure with navbar and footer
 */
export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <MainNavbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
