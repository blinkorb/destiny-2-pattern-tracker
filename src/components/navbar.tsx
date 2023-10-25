import { useIsClientRender } from '@blinkorb/resolute';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { useTranslate } from '../translations.js';

const useStyles = createUseStyles((theme) => ({
  header: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: 12,
    backgroundColor: theme.BLACK,
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  h1: {
    fontSize: 18,
    margin: 0,
    padding: 0,
  },
  hideSmall: {
    display: 'none',
    '@media all and (min-width: 768px)': {
      display: 'initial',
    },
  },
  hideLarge: {
    '@media all and (min-width: 768px)': {
      display: 'none',
    },
  },
  acquired: {
    fontSize: 14,
    '@media all and (min-width: 768px)': {
      fontSize: 16,
    },
  },
}));

const Navbar = ({
  acquiredCount,
  totalCount,
  isLoggedIn,
  reAuth,
}: {
  acquiredCount: number;
  totalCount: number;
  isLoggedIn: boolean;
  reAuth: () => void;
}) => {
  const isClientRender = useIsClientRender();
  const translate = useTranslate();
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <h1
        className={styles.h1}
        title={translate('destiny2PatternTracker')}
        aria-label={translate('destiny2PatternTracker')}
      >
        <span className={styles.hideLarge}>{translate('d2pt')}</span>
        <span className={styles.hideSmall}>
          {translate('destiny2PatternTracker')}
        </span>
      </h1>
      {!!(acquiredCount && totalCount) && isClientRender && (
        <span className={styles.acquired}>
          {acquiredCount}/{totalCount}
        </span>
      )}
      {isLoggedIn && isClientRender ? (
        <button disabled={!isClientRender}>{translate('logout')}</button>
      ) : (
        <button disabled={!isClientRender} onClick={reAuth}>
          {translate('login')}
        </button>
      )}
    </header>
  );
};

export default Navbar;
