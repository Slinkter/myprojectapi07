import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonSkeleton } from "../components/ui/PokemonSkeleton";
import { Layout } from "../components/layout/Layout";
import { MainNavbar } from "../components/layout/MainNavbar";

/**
 * @typedef {Object} AppProps
 * @description Props for the main App component.
 */

// Lazy load pages to improve initial load performance
const HomePage = lazy(() => import("./pages/HomePage"));
const AccountSettingsPage = lazy(() => import("./pages/AccountSettingsPage"));
const Web3CollectionsPage = lazy(() =>
    import("../features/web3/components/Web3CollectionsPage")
);
const BillingPage = lazy(() =>
    import("../features/billing/components/BillingPage")
);

/**
 * Main application component responsible for routing and global layout.
 * It uses React Router for navigation and lazy loading for pages.
 * @returns {JSX.Element} The App component.
 */
function App() {
    return (
        <Router>
            <MainNavbar />
            {/* Main Content Area with Suspense for lazy loaded pages */}
            <Layout>
                <Suspense
                    fallback={
                        <div className="flex justify-center items-center h-screen">
                            <PokemonSkeleton />
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/account"
                            element={<AccountSettingsPage />}
                        />
                        <Route path="/web3" element={<Web3CollectionsPage />} />
                        <Route path="/billing" element={<BillingPage />} />
                        {/* Add a 404 page later if needed */}
                    </Routes>
                </Suspense>
            </Layout>
        </Router>
    );
}
