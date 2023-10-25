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

export const GROUPINGS: WeaponGroupings = [
  // Seasons
  {
    key: 'seasonOfTheWitch',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 62770389,
          },
          {
            patternHash: 1317504516,
          },
          {
            patternHash: 1009080684,
          },
          {
            patternHash: 2797349554,
          },
          {
            patternHash: 1160898447,
          },
          {
            patternHash: 3866025027,
          },
        ],
      },
    ],
  },
  {
    key: 'seasonOfTheDeep',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 647663396,
          },
          {
            patternHash: 2282456732,
          },
          {
            patternHash: 1561746821,
          },
          {
            patternHash: 1131146983,
          },
          {
            patternHash: 2226955581,
          },
          {
            patternHash: 3903558318,
          },
        ],
      },
    ],
  },
  {
    key: 'seasonOfDefiance',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 1585622772,
          },
          {
            patternHash: 3788315135,
          },
          {
            patternHash: 1238433870,
          },
          {
            patternHash: 2359407071,
          },
          {
            patternHash: 1472159692,
          },
          {
            patternHash: 2995468005,
          },
        ],
      },
      {
        key: 'secondary',
        items: [
          {
            patternHash: 602820804,
          },
          {
            patternHash: 602820806,
          },
          {
            patternHash: 602820807,
          },
        ],
      },
    ],
  },
  {
    key: 'seasonOfTheSeraph',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 1172884782,
          },
          {
            patternHash: 4186079026,
          },
          {
            patternHash: 1547760589,
          },
          {
            patternHash: 2287240026,
          },
          {
            patternHash: 3163061743,
          },
          {
            patternHash: 3505958430,
          },
        ],
      },
      {
        key: 'ikelos',
        items: [
          {
            patternHash: 2206168388,
          },
          {
            patternHash: 3588724988,
          },
          {
            patternHash: 1285580487,
          },
          {
            patternHash: 2289039197,
          },
        ],
      },
    ],
  },
  {
    key: 'seasonOfPlunder',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 600973584,
          },
          {
            patternHash: 4255710333,
          },
          {
            patternHash: 2192971810,
          },
          {
            patternHash: 541650229,
          },
          {
            patternHash: 2839071082,
          },
          {
            patternHash: 4176833041,
          },
        ],
      },
    ],
  },
  {
    key: 'seasonOfTheHaunted',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 2569300390,
          },
          {
            patternHash: 2090638254,
          },
          {
            patternHash: 1644173130,
          },
          {
            patternHash: 718127891,
          },
          {
            patternHash: 945540117,
          },
          {
            patternHash: 2115513552,
          },
        ],
      },
      {
        key: 'secondary',
        items: [
          {
            patternHash: 3028588557,
          },
          {
            patternHash: 3097097481,
          },
          {
            patternHash: 952833197,
          },
          {
            patternHash: 2278246612,
          },
        ],
      },
    ],
  },
  {
    key: 'seasonOfTheRisen',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 2587734818,
          },
          {
            patternHash: 4195995171,
          },
          {
            patternHash: 3517716296,
          },
          {
            patternHash: 578487175,
          },
          {
            patternHash: 2354821643,
          },
          {
            patternHash: 1058494657,
          },
        ],
      },
    ],
  },
  // Campaigns
  {
    key: 'theWitchQueen',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 757218923,
          },
          {
            patternHash: 2343708185,
          },
          {
            patternHash: 1055778551,
          },
        ],
      },
    ],
  },
  {
    key: 'lightfall',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 1010541891,
          },
          {
            patternHash: 4071675560,
          },
          {
            patternHash: 2321884654,
          },
          {
            patternHash: 3813851633,
          },
          {
            patternHash: 3585040495,
          },
        ],
      },
    ],
  },
  // Dungeons
  {
    key: 'duality',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 1607199395,
          },
          {
            patternHash: 1992355759,
          },
        ],
      },
    ],
  },
  // Raids
  {
    key: 'crotasEnd',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 2763195153,
          },
          {
            patternHash: 4012948024,
          },
          {
            patternHash: 457816674,
          },
          {
            patternHash: 1399383222,
          },
          {
            patternHash: 3272233517,
          },
          {
            patternHash: 1122822939,
          },
        ],
      },
    ],
  },
  {
    key: 'rootOfNightmares',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 1865560303,
          },
          {
            patternHash: 3989172612,
          },
          {
            patternHash: 2776812591,
          },
          {
            patternHash: 2350475759,
          },
          {
            patternHash: 3766980196,
          },
          {
            patternHash: 1175771762,
          },
        ],
      },
    ],
  },
  {
    key: 'kingsFall',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 1769856981,
          },
          {
            patternHash: 3036070042,
          },
          {
            patternHash: 899111755,
          },
          {
            patternHash: 2095727101,
          },
          {
            patternHash: 3671347212,
          },
          {
            patternHash: 1163414343,
          },
        ],
      },
    ],
  },
  {
    key: 'vowOfTheDisciple',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 1727384791,
          },
          {
            patternHash: 895097684,
          },
          {
            patternHash: 2139190869,
          },
          {
            patternHash: 2275145211,
          },
          {
            patternHash: 4139166068,
          },
          {
            patternHash: 2933132219,
          },
        ],
      },
    ],
  },
  // {
  //   key: 'vaultOfGlass',
  //   groups: [{ key: 'standard', items: [] }],
  // },
  {
    key: 'deepStoneCrypt',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 535966746,
          },
          {
            patternHash: 2808508647,
          },
          {
            patternHash: 4191526098,
          },
          {
            patternHash: 1231218137,
          },
          {
            patternHash: 1320769880,
          },
          {
            patternHash: 600737282,
          },
        ],
      },
    ],
  },
  // {
  //   key: 'gardenOfSalvation',
  //   groups: [{ key: 'standard', items: [] }],
  // },
  {
    key: 'lastWish',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 1605117129,
          },
          {
            patternHash: 688331960,
          },
          {
            patternHash: 3767125177,
          },
          {
            patternHash: 543990593,
          },
          {
            patternHash: 268816284,
          },
          {
            patternHash: 2683864852,
          },
          {
            patternHash: 2177480113,
          },
          {
            patternHash: 1308286454,
          },
        ],
      },
    ],
  },
  // Misc
  {
    key: 'wellSpring',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 2855733397,
          },
          {
            patternHash: 2371706208,
          },
          {
            patternHash: 138845773,
          },
          {
            patternHash: 408327437,
          },
        ],
      },
      {
        key: 'exotic',
        items: [
          {
            patternHash: 1236909978,
          },
          {
            patternHash: 71883942,
          },
          {
            patternHash: 3245885923,
          },
        ],
      },
    ],
  },
  {
    key: 'evidenceBoard',
    groups: [
      {
        key: 'exotic',
        items: [
          {
            patternHash: 1236909978,
          },
          {
            patternHash: 71883942,
          },
          {
            patternHash: 3245885923,
          },
        ],
      },
    ],
  },
  {
    key: 'daresOfEternity',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 2912878255,
          },
          {
            patternHash: 3591989262,
          },
          {
            patternHash: 8500040,
          },
          {
            patternHash: 2467530584,
          },
          {
            patternHash: 1558048189,
          },
          {
            patternHash: 1558048188,
          },
        ],
      },
    ],
  },
  {
    key: 'quest',
    groups: [
      {
        key: 'standard',
        items: [
          {
            patternHash: 312678365,
          },
        ],
      },
      {
        key: 'exotic',
        items: [
          {
            patternHash: 1377069894,
          },
          {
            patternHash: 2658740569,
          },
          {
            patternHash: 3891186874,
          },
          {
            patternHash: 4223953031,
          },
        ],
      },
    ],
  },
  {
    key: 'exotic',
    groups: [
      {
        key: 'first',
        items: [
          {
            patternHash: 1236909978,
          },
          {
            patternHash: 71883942,
          },
          {
            patternHash: 3245885923,
          },
          {
            patternHash: 374313494,
          },
          {
            patternHash: 1377069894,
          },
          {
            patternHash: 2658740569,
          },
          {
            patternHash: 3891186874,
          },
          {
            patternHash: 4223953031,
          },
        ],
      },
    ],
  },
];

export const GROUPED_PATTERNS = GROUPINGS.reduce<readonly number[]>(
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
  BACKGROUND: '#222',
  TEXT: '#fff',
  BORDER: '#ddd',
  BORDER_FAINT: '#aaa',
  HIGHLIGHT: '#8ddd87',
  BRAND: '#ff2c68',
} satisfies DefaultTheme;
