import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { createUseStyles } from 'react-jss';

import {
  DamageTypeResponse,
  ItemsResponse,
  PatternWithCompletion,
} from '../types.js';
import AmmoTypeIcon from './ammo-type-icon.js';
import DamageTypeIcon from './damage-type-icon.js';
import LoadingDots from './loading-dots.js';

const useStyles = createUseStyles((theme) => ({
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: 0,
    margin: 0,
    '&:hover $listTextWrapper': {
      display: 'flex',
    },
  },
  listItemLoaded: {
    '& $listIconWrapper': {
      borderColor: theme.BRAND,
    },
  },
  listItemComplete: {
    '& $listIconWrapper': {
      borderColor: theme.HIGHLIGHT,
    },
  },
  listIconWrapper: {
    position: 'relative',
    width: 42,
    height: 42,
    border: '1px solid',
    borderColor: theme.BORDER,
    '@media all and (min-width: 768px)': {
      width: 56,
      height: 56,
    },
  },
  listIcon: {
    width: '100%',
    height: '100%',
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
  progress: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 4,
    backgroundColor: theme.BACKGROUND,
    fontSize: 10,
    '@media all and (min-width: 768px)': {
      fontSize: 12,
    },
  },
  damageTypeIcon: {
    width: 10,
    height: 10,
    '@media all and (min-width: 768px)': {
      width: 12,
      height: 12,
    },
  },
  ammoTypeIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    '@media all and (min-width: 768px)': {
      bottom: 4,
      right: 4,
      width: 16,
    },
  },
}));

const Pattern = ({
  pattern,
  userLoadingState,
  hasProfile,
  items,
  damageType,
}: {
  pattern: PatternWithCompletion;
  userLoadingState: boolean;
  hasProfile: boolean;
  items: ItemsResponse | undefined;
  damageType: DamageTypeResponse | undefined;
}) => {
  const styles = useStyles();

  const item = useMemo(() => {
    if (!items) {
      return undefined;
    }

    const outputItemHash = pattern.crafting?.outputItemHash;

    if (typeof outputItemHash === 'undefined') {
      return undefined;
    }

    return items[outputItemHash];
  }, [items, pattern.crafting?.outputItemHash]);

  const damageTypeIcon = useMemo(() => {
    if (!damageType || !item) {
      return undefined;
    }

    const damageTypeHash = item.defaultDamageTypeHash;

    if (typeof damageTypeHash === 'undefined') {
      return undefined;
    }

    const damageTypeDisplay = damageType[damageTypeHash]?.displayProperties;

    return damageTypeDisplay?.hasIcon ? damageTypeDisplay.icon : undefined;
  }, [damageType, item]);

  const initialLoad = !hasProfile && userLoadingState;

  return (
    <li
      key={pattern.hash}
      className={classNames(styles.listItem, {
        [styles.listItemLoaded]: !initialLoad && hasProfile,
        [styles.listItemComplete]: pattern.complete,
      })}
    >
      <div className={styles.listIconWrapper}>
        {pattern.displayProperties.hasIcon && (
          <img
            className={styles.listIcon}
            src={`${process.env.CLIENT_API_URL}${pattern.displayProperties.icon}`}
          />
        )}
        <AmmoTypeIcon
          className={styles.ammoTypeIcon}
          ammoType={item?.equippingBlock?.ammoType}
        />
      </div>

      <div className={styles.progress}>
        <DamageTypeIcon
          className={styles.damageTypeIcon}
          damageTypeIcon={damageTypeIcon}
        />
        {initialLoad ? (
          <LoadingDots />
        ) : (
          pattern.objectives?.map((objective) => (
            <>
              {objective.progress}/{objective.completionValue}
            </>
          )) ?? <>#/#</>
        )}
      </div>
      <div className={styles.listTextWrapper}>
        <p className={styles.listTitle}>{pattern.displayProperties.name}</p>
        <p className={styles.listFlavor}>{pattern.flavorText}</p>
      </div>
    </li>
  );
};

export default memo(Pattern);
