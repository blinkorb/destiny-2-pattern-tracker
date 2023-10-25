import { Link } from '@blinkorb/resolute';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { useTranslate } from '../translations.js';

const useStyles = createUseStyles((theme) => ({
  footer: {
    display: 'flex',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: theme.BLACK,
    fontSize: 14,
  },
  p: {
    margin: 0,
    padding: 0,
  },
}));

const Footer = () => {
  const translate = useTranslate();
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <p className={styles.p}>{translate('byBlinkOrb')}</p>
      <p className={styles.p}>
        <Link
          title={translate('onGitHub')}
          href="https://github.com/blinkorb/destiny-2-pattern-tracker"
          target="_blank"
        >
          {translate('contribute')}
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
