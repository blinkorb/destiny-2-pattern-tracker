import { Link } from '@blinkorb/resolute';
import classNames from 'classnames';
import React, { memo, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { D2_FOUNDRY_URL } from '../constants.js';
import { useTranslate } from '../translations.js';
import {
  DamageTypeResponse,
  EquipmentSlotResponse,
  ItemsResponse,
  PatternWithCompletion,
} from '../types.js';
import AmmoTypeIcon from './ammo-type-icon.js';
import DamageTypeIcon from './damage-type-icon.js';
import LinkIcon from './link-icon.js';
import LoadingDots from './loading-dots.js';
import Popover from './popover.js';

const useStyles = createUseStyles((theme) => ({
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: 0,
    margin: 0,
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
  listTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 4,
    fontSize: 16,
    margin: 0,
    marginBottom: 2,
  },
  listFlavor: {
    fontSize: 12,
    margin: 0,
    marginBottom: 8,
    fontStyle: 'italic',
    color: theme.BORDER_FAINT,
  },
  listSlot: {
    fontSize: 14,
    margin: 0,
    marginBottom: 8,
  },
  d2FoundryLink: {
    fontSize: 14,
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
  popoverIconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
  },
  damageTypeIconPopover: {
    width: 14,
    height: 14,
  },
  ammoTypeIconPopover: {
    width: 18,
  },
}));

const Pattern = ({
  pattern,
  userLoadingState,
  hasProfile,
  items,
  damageType,
  equipmentSlot,
}: {
  pattern: PatternWithCompletion;
  userLoadingState: boolean;
  hasProfile: boolean;
  items: ItemsResponse | undefined;
  damageType: DamageTypeResponse | undefined;
  equipmentSlot: EquipmentSlotResponse | undefined;
}) => {
  const translate = useTranslate();
  const [listItemRef, setListItemRef] = useState<HTMLElement | null>(null);
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

  const equipmentSlotText = useMemo(() => {
    if (!equipmentSlot || !item) {
      return undefined;
    }

    const equipmentSlotHash = item.equippingBlock?.equipmentSlotTypeHash;

    if (typeof equipmentSlotHash === 'undefined') {
      return undefined;
    }

    const equipmentSlotDisplay =
      equipmentSlot[equipmentSlotHash]?.displayProperties.name;

    return equipmentSlotDisplay;
  }, [equipmentSlot, item]);

  const initialLoad = !hasProfile && userLoadingState;

  return (
    <li
      ref={setListItemRef}
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
      <Popover rootRef={listItemRef} width={200}>
        <p className={styles.listTitle}>
          {pattern.displayProperties.name}
          <span className={styles.popoverIconWrapper}>
            <DamageTypeIcon
              className={styles.damageTypeIconPopover}
              damageTypeIcon={damageTypeIcon}
            />
            <AmmoTypeIcon
              className={styles.ammoTypeIconPopover}
              ammoType={item?.equippingBlock?.ammoType}
            />
          </span>
        </p>
        <p className={styles.listFlavor}>{pattern.flavorText}</p>
        <p className={styles.listSlot}>{equipmentSlotText}</p>
        {item && (
          <Link
            className={styles.d2FoundryLink}
            href={`${D2_FOUNDRY_URL}${item.hash}`}
            title={translate('exploreStatsAndRollsOnD2Foundry')}
            target="_blank"
          >
            {translate('exploreStatsAndRolls')}
            <LinkIcon />
          </Link>
        )}
      </Popover>
    </li>
  );
};

export default memo(Pattern);
