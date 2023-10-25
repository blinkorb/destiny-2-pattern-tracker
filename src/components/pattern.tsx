import classNames from 'classnames';
import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';

import { PatternWithCompletion } from '../types.js';
import LoadingDots from './loading-dots.js';

const useStyles = createUseStyles((theme) => ({
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    padding: 1,
    margin: 0,
    backgroundColor: theme.BORDER,
    '&:hover $listTextWrapper': {
      display: 'flex',
    },
  },
  listItemComplete: {
    backgroundColor: theme.HIGHLIGHT,
  },
  listIcon: {
    width: 42,
    height: 42,
    '@media all and (min-width: 768px)': {
      width: 56,
      height: 56,
    },
  },
  listTextWrapper: {
    display: 'none',
    position: 'absolute',
    width: 200,
    top: '100%',
    left: 0,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: theme.BACKGROUND,
    zIndex: 3,
    pointerEvents: 'none',
  },
  listTitle: {
    fontSize: 16,
    margin: 0,
  },
  listFlavor: {
    fontSize: 12,
    margin: 0,
  },
  borderComplete: {
    borderColor: theme.HIGHLIGHT,
  },
  progress: {
    padding: 2,
    color: theme.BACKGROUND,
    fontSize: 12,
  },
}));

const Pattern = ({
  pattern,
  userLoadingState,
}: {
  pattern: PatternWithCompletion;
  userLoadingState: boolean;
}) => {
  const styles = useStyles();

  return (
    <li
      key={pattern.hash}
      className={classNames(styles.listItem, {
        [styles.listItemComplete]: pattern.complete,
      })}
    >
      {pattern.displayProperties.hasIcon && (
        <img
          className={styles.listIcon}
          src={`${process.env.CLIENT_API_URL}${pattern.displayProperties.icon}`}
        />
      )}

      {userLoadingState ? (
        <div className={styles.progress}>
          <LoadingDots />
        </div>
      ) : (
        pattern.objectives && (
          <div className={styles.progress}>
            {pattern.objectives.map((objective) => (
              <>
                {objective.progress}/{objective.completionValue}
              </>
            ))}
          </div>
        )
      )}
      <div className={styles.listTextWrapper}>
        <p className={styles.listTitle}>{pattern.displayProperties.name}</p>
        <p className={styles.listFlavor}>{pattern.flavorText}</p>
      </div>
    </li>
  );
};

export default memo(Pattern);
