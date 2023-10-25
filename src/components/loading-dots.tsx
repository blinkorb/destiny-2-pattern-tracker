import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@keyframes dot1': {
    '0%': {
      color: 'transparent',
    },
    '30%': {
      color: 'inherit',
    },
    '50%': {
      color: 'transparent',
    },
    '100%': {
      color: 'transparent',
    },
  },
  '@keyframes dot2': {
    '0%': {
      color: 'transparent',
    },
    '10%': {
      color: 'transparent',
    },
    '40%': {
      color: 'inherit',
    },
    '60%': {
      color: 'transparent',
    },
    '100%': {
      color: 'transparent',
    },
  },
  '@keyframes dot3': {
    '0%': {
      color: 'transparent',
    },
    '20%': {
      color: 'transparent',
    },
    '50%': {
      color: 'inherit',
    },
    '70%': {
      color: 'transparent',
    },
    '100%': {
      color: 'transparent',
    },
  },
  dot1: {
    '&::before': {
      content: '"."',
    },
    animation: '$dot1 2s linear infinite',
  },
  dot2: {
    '&::before': {
      content: '"."',
    },
    animation: '$dot2 2s linear infinite',
  },
  dot3: {
    '&::before': {
      content: '"."',
    },
    animation: '$dot3 2s linear infinite',
  },
});

const LoadingDots = () => {
  const styles = useStyles();

  return (
    <span>
      <span className={styles.dot1} />
      <span className={styles.dot2} />
      <span className={styles.dot3} />
    </span>
  );
};

export default LoadingDots;
