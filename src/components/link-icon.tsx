import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  icon: {
    display: 'inline-block',
    width: '1em',
    marginLeft: '0.25em',
    fill: 'currentColor',
    verticalAlign: 'middle',
    marginBottom: '0.125em',
  },
});

const LinkIcon = () => {
  const styles = useStyles();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={styles.icon}
    >
      <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
    </svg>
  );
};

export default memo(LinkIcon);
