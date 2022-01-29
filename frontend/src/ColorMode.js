import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { createContext, useMemo, useState } from 'react';
import App from './App';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ColorMode = () => {
  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App colorContext={ColorModeContext} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorMode;
