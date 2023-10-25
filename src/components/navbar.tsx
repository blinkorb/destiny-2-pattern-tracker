import { useIsClientRender } from '@blinkorb/resolute';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { useTranslate } from '../translations.js';
import LoadingDots from './loading-dots.js';

export const NAVBAR_HEIGHT = 52;

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
    height: NAVBAR_HEIGHT,
    padding: 12,
    backgroundColor: theme.BACKGROUND,
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  logoAndTitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 18,
    height: 18,
  },
  title: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    marginTop: 2,
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
  isLoggingIn,
  reAuth,
  clearAuth,
}: {
  acquiredCount: number;
  totalCount: number;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  reAuth: () => void;
  clearAuth: () => void;
}) => {
  const [isLoggingInOrOut, setIsLoggingInOrOut] = useState(false);
  const isClientRender = useIsClientRender();
  const translate = useTranslate();
  const styles = useStyles();

  const login = useCallback(() => {
    setIsLoggingInOrOut(true);
    globalThis.window.setTimeout(() => reAuth(), 100);
  }, [reAuth]);

  const logout = useCallback(() => {
    setIsLoggingInOrOut(true);
    globalThis.window.setTimeout(() => clearAuth(), 100);
  }, [clearAuth]);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoggingInOrOut(false);
    }
  }, [isLoggedIn]);

  const showLoading = !isClientRender || isLoggingIn || isLoggingInOrOut;

  return (
    <header className={styles.header}>
      <div className={styles.logoAndTitleWrapper}>
        <img src="/images/icon-64x64.png" className={styles.logo} />
        <h1
          className={styles.title}
          title={translate('destiny2PatternTracker')}
          aria-label={translate('destiny2PatternTracker')}
        >
          <span className={styles.hideLarge}>{translate('d2pt')}</span>
          <span className={styles.hideSmall}>
            {translate('destiny2PatternTracker')}
          </span>
        </h1>
      </div>
      {!!(acquiredCount && totalCount) && isClientRender && (
        <span className={styles.acquired}>
          {acquiredCount}/{totalCount}
        </span>
      )}
      {isLoggedIn && isClientRender ? (
        <button disabled={showLoading} onClick={logout}>
          {showLoading ? (
            <>
              {translate('loading')}
              <LoadingDots />
            </>
          ) : (
            translate('logout')
          )}
        </button>
      ) : (
        <button disabled={showLoading} onClick={login}>
          {showLoading ? (
            <>
              {translate('loading')}
              <LoadingDots />
            </>
          ) : (
            translate('login')
          )}
        </button>
      )}
    </header>
  );
};

export default memo(Navbar);
