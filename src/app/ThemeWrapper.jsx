
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useTheme } from '@/features/theme/useTheme';

/**
 * This component acts as a bridge between the Redux theme state and MUI's ThemeProvider.
 * It creates a MUI theme object based on the current mode (light/dark) and provides it
 * to all descendant MUI components. It also includes CssBaseline for style normalization.
 */
const ThemeWrapper = ({ children }) => {
  const { currentTheme } = useTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentTheme,
        },
        // Here you can add other theme customizations
        // typography: { ... },
        // components: { ... },
      }),
    [currentTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeWrapper;
