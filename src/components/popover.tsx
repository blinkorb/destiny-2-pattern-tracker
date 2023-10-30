import React, { memo, PropsWithChildren, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  popover: {
    display: 'none',
    position: 'absolute',
    top: '100%',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: theme.BACKGROUND,
    border: '1px solid',
    borderColor: theme.BORDER_FAINT,
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.5)',
    zIndex: 3,
    borderRadius: 2,
  },
}));

const Popover = ({
  rootRef,
  width,
  children,
}: PropsWithChildren<{
  width: number;
  rootRef: HTMLElement | null;
}>) => {
  const [align, setAlign] = useState<'left' | 'right' | null>(null);
  const styles = useStyles();

  useEffect(() => {
    const onMouseOver = () => {
      const left = rootRef?.getBoundingClientRect().left ?? 0;
      setAlign(left + width >= globalThis.window.innerWidth ? 'right' : 'left');
    };

    const onMouseOut = () => {
      setAlign(null);
    };

    rootRef?.addEventListener('mouseover', onMouseOver);
    rootRef?.addEventListener('mouseout', onMouseOut);

    return () => {
      rootRef?.removeEventListener('mouseover', onMouseOver);
      rootRef?.removeEventListener('mouseout', onMouseOut);
    };
  }, [rootRef, width]);

  return (
    <div
      className={styles.popover}
      style={align ? { display: 'flex', [align]: 0, width } : { width }}
    >
      {children}
    </div>
  );
};

export default memo(Popover);
