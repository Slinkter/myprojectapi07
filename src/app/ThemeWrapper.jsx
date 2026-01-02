
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTheme } from '@/features/theme/hooks/useTheme';

/**
 * This component acts as a bridge between the Redux theme state and Tailwind CSS dark mode.
 * It adds/removes the 'dark' class to the document element based on the current theme mode.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 */
const ThemeWrapper = ({ children }) => {
  const { currentTheme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [currentTheme]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {children}
    </div>
  );
};

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeWrapper;
