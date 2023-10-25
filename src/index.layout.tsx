import React, { PropsWithChildren } from 'react';
import { createUseStyles } from 'react-jss';

import { StateProvider } from './context.js';

const useStyles = createUseStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
    },
    'html,body': {
      backgroundColor: '#333',
      fontFamily: 'arial, helvetica, sans-serif',
      fontSize: 16,
      color: 'white',
    },
  },
});

const Layout = ({ children }: PropsWithChildren) => {
  useStyles();

  return <StateProvider>{children}</StateProvider>;
};

export default Layout;
