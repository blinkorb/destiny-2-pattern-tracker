import React, { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
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
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: theme.BACKGROUND,
      fontFamily: 'arial, helvetica, sans-serif',
      fontSize: 16,
      color: theme.TEXT,
      padding: 0,
      margin: 0,
      overflowX: 'hidden',
    },
    a: {
      color: theme.BRAND,
      textDecoration: 'underline',
    },
    button: {
      display: 'flex',
      flex: 0,
      border: 'none',
      borderRadius: 2,
      backgroundColor: theme.BRAND,
      color: theme.BACKGROUND,
      fontSize: 16,
      padding: '4px 12px',
      cursor: 'pointer',
    },
    '*:disabled': {
      opacity: 0.5,
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
        <Helmet>
          <link rel="shortcut icon" href="/images/favicon.ico" />
        </Helmet>
        <StateProvider>{children}</StateProvider>
      </GlobalStyles>
    </ThemeProvider>
  );
};

export default Layout;
