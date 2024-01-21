import { CSSProperties, HTMLProps, useEffect, useMemo, useState } from 'react';

const usePopover = ({ width, id }: { width: number; id: string }) => {
  const [rootRef, setRootRef] = useState<HTMLElement | null>(null);
  const [popoverStyles, setPopoverStyles] = useState<CSSProperties | undefined>(
    undefined
  );

  useEffect(() => {
    const onMouseOver = () => {
      const rootRect = rootRef?.getBoundingClientRect();
      const top = rootRect?.top ?? 0;
      const left = rootRect?.left ?? 0;

      const alignHorizontal =
        left + width >= globalThis.window.innerWidth ? 'right' : 'left';
      const alignVertical =
        top + 300 >= globalThis.window.innerHeight ? 'bottom' : 'top';

      setPopoverStyles({
        display: 'flex',
        [alignHorizontal]: 0,
        [alignVertical]: '100%',
      });
    };

    const onMouseOut = () => {
      setPopoverStyles(undefined);
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
        setPopoverStyles(undefined);
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

        setPopoverStyles((prev) => {
          if (!prev) {
            return {
              display: 'flex',
              [alignHorizontal]: 0,
              [alignVertical]: '100%',
            };
          }

          return undefined;
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

  return useMemo(
    (): {
      rootProps: HTMLProps<HTMLElement>;
      popoverProps: HTMLProps<HTMLElement>;
    } => ({
      rootProps: {
        ref: setRootRef,
        id,
        'aria-expanded': !!popoverStyles,
        role: 'button',
        tabIndex: 0,
      },
      popoverProps: {
        style: {
          ...popoverStyles,
          width,
        },
        'aria-labelledby': id,
        role: 'region',
      },
    }),
    [id, popoverStyles, width]
  );
};

export default usePopover;
