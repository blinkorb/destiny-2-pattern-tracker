import React, { memo, useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { useTranslate } from '../translations.js';
import LoadingDots from './loading-dots.js';

const useStyles = createUseStyles((theme) => ({
  modal: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2000,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: theme.BACKGROUND,
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.5)',
    borderRadius: 2,
  },
  p: {
    margin: 0,
    padding: 0,
    marginBottom: 12,
  },
  button: {
    display: 'inline-flex',
  },
}));

const AuthExpired = ({ reAuth }: { reAuth: () => void }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const styles = useStyles();
  const translate = useTranslate();

  const login = useCallback(() => {
    setIsLoggingIn(true);
    globalThis.window.setTimeout(() => reAuth(), 100);
  }, [reAuth]);

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <p className={styles.p}>{translate('authenticationExpired')}</p>
        <p className={styles.p}>{translate('pleaseLoginAgain')}</p>
        <button
          className={styles.button}
          disabled={isLoggingIn}
          onClick={login}
        >
          {isLoggingIn ? (
            <>
              {translate('loading')}
              <LoadingDots />
            </>
          ) : (
            translate('login')
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(AuthExpired);
