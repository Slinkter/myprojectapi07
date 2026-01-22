import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@/features/theme";

/**
 * @component ThemeWrapper
 * @description Un componente "efector" que aplica el tema (claro/oscuro) a la aplicación.
 * No renderiza ninguna UI propia, sino que sincroniza el estado del tema de Redux con el DOM
 * para que los estilos de TailwindCSS (clase 'dark') se apliquen globalmente.
 *
 * @param {object} props - Las props del componente.
 * @param {React.ReactNode} props.children - Los nodos hijos que este componente envolverá.
 * @returns {React.ReactNode} Devuelve los hijos sin modificarlos.
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
