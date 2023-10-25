import React, { PropsWithChildren } from 'react';
import { createUseStyles, ThemeProvider } from 'react-jss';

import { THEME } from './constants.js';
import { StateProvider } from './context.js';

const useStyles = createUseStyles((theme) => ({
  '@global': {
    '*': {
      boxSizing: 'border-box',
    },
    'html,body': {
      display: 'flex',
      flex: 1,
      minHeight: '100vh',
      backgroundColor: theme.BLACK,
      fontFamily: 'arial, helvetica, sans-serif',
      fontSize: 16,
      color: theme.WHITE,
    },
  },
}));

const GlobalStyles = ({ children }: PropsWithChildren) => {
  useStyles();

  return children;
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyles>
        <StateProvider>{children}</StateProvider>
      </GlobalStyles>
    </ThemeProvider>
  );
};

export default Layout;
