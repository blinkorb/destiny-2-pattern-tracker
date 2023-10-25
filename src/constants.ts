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
    groups: [[]],
  },
  {
    key: 'seasonOfTheDeep',
    groups: [[]],
  },
  {
    key: 'seasonOfDefiance',
    groups: [[], []],
  },
  {
    key: 'seasonOfTheSeraph',
    groups: [[]],
  },
  {
    key: 'seasonOfPlunder',
    groups: [[]],
  },
  {
    key: 'seasonOfTheHaunted',
    groups: [[]],
  },
  {
    key: 'seasonOfTheRisen',
    groups: [[]],
  },
  // Raids
  {
    key: 'crotasEnd',
    groups: [[]],
  },
  {
    key: 'rootOfNightmares',
    groups: [[]],
  },
  {
    key: 'kingsFall',
    groups: [[]],
  },
  {
    key: 'vowOfTheDisciple',
    groups: [[]],
  },
  {
    key: 'vaultOfGlass',
    groups: [[]],
  },
  {
    key: 'deepStoneCrypt',
    groups: [[]],
  },
  {
    key: 'gardenOfSalvation',
    groups: [[]],
  },
  {
    key: 'lastWish',
    groups: [[]],
  },
  // Misc
  {
    key: 'wellSpring',
    groups: [[], []],
  },
  {
    key: 'evidenceBoard',
    groups: [[], []],
  },
  {
    key: 'daresOfEternity',
    groups: [[]],
  },
];

export const GROUPED_PATTERNS = WEAPON_GROUPINGS.reduce<readonly number[]>(
  (acc, grouping) => {
    return grouping.groups.reduce<readonly number[]>(
      (acc2, group) => [...acc2, ...group.map((item) => item.patternHash)],
      acc
    );
  },
  []
);

export const ROOT_PRESENTATION_NODE_HASH = 2642502414;
