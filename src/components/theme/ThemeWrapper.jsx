import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@/features/theme";

/**
 * A component that applies the current theme to the application.
 * It listens to the theme state from the Redux store and adds or removes
 * the 'dark' class from the root `<html>` element to apply Tailwind CSS's
 * dark mode styles.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The rendered child components.
 */
const ThemeWrapper = ({ children }) => {
  const { currentTheme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    if (currentTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [currentTheme]);

  return <>{children}</>;
};

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeWrapper;
