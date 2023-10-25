import { DefaultTheme } from 'react-jss';

import { WeaponGroupings } from './types.js';

export const MANIFEST_TIMEOUT = 1000 * 60 * 5;
export const POLLING_INTERVAL = 1000 * 60;

export const SESSION_STORAGE_KEY = 'd2pt';
export const DB_NAME = 'd2pt';
export const DB_VERSION = 1;

export enum SessionStore {
  TOKEN = 'token',
  AUTH_STATE = 'authState',
}

export enum DBStore {
  META = 'meta',
  MANIFEST = 'manifest',
  ITEMS = 'items',
  RECORDS = 'records',
  PRESENTATION_NODES = 'presentationNodes',
}

export const DEFAULT_LANGUAGE = 'en' as const;

export const SUPPORTED_LANGUAGES = [
  'de',
  'en',
  'es',
  'es-mx',
  'fr',
  'it',
  'ja',
  'ko',
  'pl',
  'pt-br',
  'ru',
  'zh-chs',
  'zh-cht',
] as const;

export const WEAPON_GROUPINGS: WeaponGroupings = [
  // Seasons
  {
    key: 'seasonOfTheWitch',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'seasonOfTheDeep',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'seasonOfDefiance',
    groups: [
      { key: 'standard', items: [] },
      { key: 'secondary', items: [] },
    ],
  },
  {
    key: 'seasonOfTheSeraph',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'seasonOfPlunder',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'seasonOfTheHaunted',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'seasonOfTheRisen',
    groups: [{ key: 'standard', items: [] }],
  },
  // Raids
  {
    key: 'crotasEnd',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'rootOfNightmares',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'kingsFall',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'vowOfTheDisciple',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'vaultOfGlass',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'deepStoneCrypt',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'gardenOfSalvation',
    groups: [{ key: 'standard', items: [] }],
  },
  {
    key: 'lastWish',
    groups: [{ key: 'standard', items: [] }],
  },
  // Misc
  {
    key: 'wellSpring',
    groups: [
      { key: 'standard', items: [] },
      { key: 'exotic', items: [] },
    ],
  },
  {
    key: 'evidenceBoard',
    groups: [
      { key: 'standard', items: [] },
      { key: 'exotic', items: [] },
    ],
  },
  {
    key: 'daresOfEternity',
    groups: [{ key: 'standard', items: [] }],
  },
];

export const GROUPED_PATTERNS = WEAPON_GROUPINGS.reduce<readonly number[]>(
  (acc, grouping) => {
    return grouping.groups.reduce<readonly number[]>(
      (acc2, group) => [
        ...acc2,
        ...group.items.map((item) => item.patternHash),
      ],
      acc
    );
  },
  []
);

export const ROOT_PRESENTATION_NODE_HASH = 2642502414;

export const THEME = {
  BLACK: '#222',
  WHITE: '#fff',
  GRAY_LIGHTEST: '#ddd',
  YELLOW: '#eade8b',
} satisfies DefaultTheme;
