import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

/**
 * A layout component that provides a consistent structure for the main pages.
 * It includes the main navigation bar and a placeholder for the page content.
 * @returns {JSX.Element} The rendered main layout.
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
