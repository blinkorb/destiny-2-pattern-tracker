import { Link } from '@blinkorb/resolute';
import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';

import { useTranslate } from '../translations.js';
import LinkIcon from './link-icon.js';

const useStyles = createUseStyles((theme) => ({
  footer: {
    display: 'flex',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: theme.BACKGROUND,
    fontSize: 14,
    gap: 4,
    flexWrap: 'wrap',
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
          <LinkIcon />
        </Link>
      </p>
    </footer>
  );
};

export default memo(Footer);
