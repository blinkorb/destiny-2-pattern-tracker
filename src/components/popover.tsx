import React, {
  CSSProperties,
  memo,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  popover: {
    display: 'none',
    position: 'absolute',
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
  const [align, setAlign] = useState<CSSProperties | null>(null);
  const styles = useStyles();

  useEffect(() => {
    const onMouseOver = () => {
      const rootRect = rootRef?.getBoundingClientRect();
      const top = rootRect?.top ?? 0;
      const left = rootRect?.left ?? 0;

      const alignHorizontal =
        left + width >= globalThis.window.innerWidth ? 'right' : 'left';
      const alignVertical =
        top + 300 >= globalThis.window.innerHeight ? 'bottom' : 'top';

      setAlign({
        display: 'flex',
        [alignHorizontal]: 0,
        [alignVertical]: '100%',
      });
    };

    const onMouseOut = () => {
      setAlign(null);
    };

    const onFocusOut = (event: FocusEvent) => {
      const { currentTarget, relatedTarget } = event;
      let node = relatedTarget;
      let isNestedElement = false;

      while (node instanceof HTMLElement) {
        if (node === currentTarget) {
          isNestedElement = true;
          node = null;
        } else {
          node = node.parentElement;
        }
      }

      if (!isNestedElement) {
        setAlign(null);
      }
    };

    const onKeyPress = (event: KeyboardEvent) => {
      if (
        event.currentTarget === event.target &&
        (event.key === ' ' ||
          event.key === 'Space' ||
          event.key === 'Enter' ||
          event.key === 'Return')
      ) {
        event.preventDefault();

        const rootRect = rootRef?.getBoundingClientRect();
        const top = rootRect?.top ?? 0;
        const left = rootRect?.left ?? 0;

        const alignHorizontal =
          left + width >= globalThis.window.innerWidth ? 'right' : 'left';
        const alignVertical =
          top + 300 >= globalThis.window.innerHeight ? 'bottom' : 'top';

        setAlign((prev) => {
          if (!prev) {
            return {
              display: 'flex',
              [alignHorizontal]: 0,
              [alignVertical]: '100%',
            };
          }

          return null;
        });
      }
    };

    rootRef?.addEventListener('mouseover', onMouseOver, { passive: false });
    rootRef?.addEventListener('mouseout', onMouseOut, { passive: false });
    rootRef?.addEventListener('focusout', onFocusOut, { passive: false });
    rootRef?.addEventListener('keydown', onKeyPress, { passive: false });

    return () => {
      rootRef?.removeEventListener('mouseover', onMouseOver);
      rootRef?.removeEventListener('mouseout', onMouseOut);
      rootRef?.removeEventListener('focusout', onFocusOut);
      rootRef?.removeEventListener('keydown', onKeyPress);
    };
  }, [rootRef, width]);

  return (
    <div className={styles.popover} style={{ ...align, width }}>
      {children}
    </div>
  );
};

export default memo(Popover);
