import { DefaultTheme } from 'react-jss';

import { ItemSubType, WeaponGroupings } from './types.js';

export const D2_FOUNDRY_URL = 'https://d2foundry.gg/w/';

export const MANIFEST_TIMEOUT = 1000 * 60 * 5;
export const POLLING_INTERVAL = 1000 * 60;

export const SESSION_STORAGE_KEY = 'd2pt';
export const DB_NAME = 'd2pt';
export const DB_VERSION = 2;

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
  EQUIPMENT_SLOT = 'equipmentSlot',
  DAMAGE_TYPE = 'damageType',
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
            name: 'Kept Confidence',
            patternHash: 62770389,
          },
          {
            name: "Brya's Love",
            patternHash: 1317504516,
          },
          {
            name: 'The Eremite',
            patternHash: 1009080684,
          },
          {
            name: 'Locus Locutus',
            patternHash: 2797349554,
          },
          {
            name: 'Eleatic Principle',
            patternHash: 1160898447,
          },
          {
            name: 'Semiotician',
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
            name: 'Targeted Redaction',
            patternHash: 647663396,
          },
          {
            name: 'Rapacious Appetite',
            patternHash: 2282456732,
          },
          {
            name: 'Different Times',
            patternHash: 1561746821,
          },
          {
            name: 'Until Its Return',
            patternHash: 1131146983,
          },
          {
            name: 'A Distant Pull',
            patternHash: 2226955581,
          },
          {
            name: 'Thin Precipice',
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
            name: 'Perpetualis',
            patternHash: 1585622772,
          },
          {
            name: 'Raconteur',
            patternHash: 3788315135,
          },
          {
            name: 'Royal Executioner',
            patternHash: 1238433870,
          },
          {
            name: 'Prodigal Return',
            patternHash: 2359407071,
          },
          {
            name: 'Regnant',
            patternHash: 1472159692,
          },
          {
            name: 'Caretaker',
            patternHash: 2995468005,
          },
        ],
      },
      {
        key: 'secondary',
        items: [
          {
            name: 'Imperial Decree',
            patternHash: 2216711429,
          },
          {
            name: 'Throne-Cleaver',
            patternHash: 602820804,
          },
          {
            name: 'Goldtusk',
            patternHash: 602820806,
          },
          {
            name: "Death's Razor",
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
            name: 'Disparity',
            patternHash: 1172884782,
          },
          {
            name: 'Path of Least Resistance',
            patternHash: 4186079026,
          },
          {
            name: 'Judgment of Kelgorath',
            patternHash: 1547760589,
          },
          {
            name: 'Tripwire Canary',
            patternHash: 2287240026,
          },
          {
            name: 'Fire and Forget',
            patternHash: 3163061743,
          },
          {
            name: 'Retrofit Escapade',
            patternHash: 3505958430,
          },
        ],
      },
      {
        key: 'ikelos',
        items: [
          {
            name: 'IKELOS_HC_v1.0.3',
            patternHash: 2206168388,
          },
          {
            name: 'IKELOS_SMG_v1.0.3',
            patternHash: 3588724988,
          },
          {
            name: 'IKELOS_SG_v1.0.3',
            patternHash: 1285580487,
          },
          {
            name: 'IKELOS_SR_v1.0.3',
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
            name: 'No Reprieve',
            patternHash: 600973584,
          },
          {
            name: 'Blood Feud',
            patternHash: 4255710333,
          },
          {
            name: "Brigand's Law",
            patternHash: 2192971810,
          },
          {
            name: 'Tarnished Mettle',
            patternHash: 541650229,
          },
          {
            name: "Planck's Stride",
            patternHash: 2839071082,
          },
          {
            name: 'Sailspy Pitchglass',
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
            name: 'Tears of Contrition',
            patternHash: 2569300390,
          },
          {
            name: 'Firefright',
            patternHash: 2090638254,
          },
          {
            name: 'Without Remorse',
            patternHash: 1644173130,
          },
          {
            name: "Nezarec's Whisper",
            patternHash: 718127891,
          },
          {
            name: 'Hollow Denial',
            patternHash: 945540117,
          },
          {
            name: 'Bump in the Night',
            patternHash: 2115513552,
          },
        ],
      },
      {
        key: 'secondary',
        items: [
          {
            name: 'Austringer',
            patternHash: 3028588557,
          },
          {
            name: 'Drang (Baroque)',
            patternHash: 3097097481,
          },
          {
            name: 'CALUS Mini-Tool',
            patternHash: 952833197,
          },
          {
            name: 'Beloved',
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
            name: 'Sweet Sorrow',
            patternHash: 2587734818,
          },
          {
            name: 'Piece of Mind',
            patternHash: 4195995171,
          },
          {
            name: 'Under Your Skin',
            patternHash: 3517716296,
          },
          {
            name: 'Explosive Personality',
            patternHash: 578487175,
          },
          {
            name: 'Thoughtless',
            patternHash: 2354821643,
          },
          {
            name: 'Recurrent Impact',
            patternHash: 1058494657,
          },
        ],
      },
    ],
  },
  // Campaigns
  {
    key: 'lightfall',
    groups: [
      {
        key: 'standard',
        items: [
          {
            name: 'Round Robin',
            patternHash: 1010541891,
          },
          {
            name: 'Volta Bracket',
            patternHash: 4071675560,
          },
          {
            name: 'Phyllotactic Spiral',
            patternHash: 2321884654,
          },
          {
            name: 'Iterative Loop',
            patternHash: 3813851633,
          },
          {
            name: 'Dimensional Hypotrochoid',
            patternHash: 3585040495,
          },
        ],
      },
    ],
  },
  {
    key: 'theWitchQueen',
    groups: [
      {
        key: 'standard',
        items: [
          {
            name: 'The Enigma',
            patternHash: 757218923,
          },
          {
            name: 'Empirical Evidence',
            patternHash: 2343708185,
          },
          {
            name: 'Red Herring',
            patternHash: 1055778551,
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
            name: 'The Epicurean',
            patternHash: 1607199395,
          },
          {
            name: 'Fixed Odds',
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
            name: 'Word of Crota',
            patternHash: 2763195153,
          },
          {
            name: 'Oversoul Edict',
            patternHash: 4012948024,
          },
          {
            name: 'Abyss Defiant',
            patternHash: 457816674,
          },
          {
            name: 'Swordbreaker',
            patternHash: 1399383222,
          },
          {
            name: 'Fang of Ir Yût',
            patternHash: 3272233517,
          },
          {
            name: 'Song of Ir Yût',
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
            name: "Mykel's Reverence",
            patternHash: 1865560303,
          },
          {
            name: "Rufus's Fury",
            patternHash: 3989172612,
          },
          {
            name: "Briar's Contempt",
            patternHash: 2776812591,
          },
          {
            name: "Koraxis's Distress",
            patternHash: 2350475759,
          },
          {
            name: "Nessa's Oblation",
            patternHash: 3766980196,
          },
          {
            name: "Acasia's Dejection",
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
            name: "Zaouli's Bane",
            patternHash: 1769856981,
          },
          {
            name: 'Smite of Merain',
            patternHash: 3036070042,
          },
          {
            name: "Midha's Reckoning",
            patternHash: 899111755,
          },
          {
            name: 'Doom of Chelchis',
            patternHash: 2095727101,
          },
          {
            name: 'Defiance of Yasmin',
            patternHash: 3671347212,
          },
          {
            name: "Qullim's Terminus",
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
            name: 'Submission',
            patternHash: 1727384791,
          },
          {
            name: 'Insidious',
            patternHash: 895097684,
          },
          {
            name: 'Deliverance',
            patternHash: 2139190869,
          },
          {
            name: 'Forbearance',
            patternHash: 2275145211,
          },
          {
            name: "Lubrae's Ruin",
            patternHash: 4139166068,
          },
          {
            name: 'Cataclysmic',
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
            name: 'Posterity',
            patternHash: 535966746,
          },
          {
            name: 'Heritage',
            patternHash: 2808508647,
          },
          {
            name: 'Trustee',
            patternHash: 4191526098,
          },
          {
            name: 'Succession',
            patternHash: 1231218137,
          },
          {
            name: 'Bequest',
            patternHash: 1320769880,
          },
          {
            name: 'Commemoration',
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
            name: 'Age-Old Bond',
            patternHash: 1605117129,
          },
          {
            name: 'Nation of Beasts',
            patternHash: 688331960,
          },
          {
            name: 'Chattering Bone',
            patternHash: 3767125177,
          },
          {
            name: 'Tyranny of Heaven',
            patternHash: 543990593,
          },
          {
            name: 'Transfiguration',
            patternHash: 268816284,
          },
          {
            name: 'Techeun Force',
            patternHash: 2683864852,
          },
          {
            name: 'The Supremacy',
            patternHash: 2177480113,
          },
          {
            name: 'Apex Predator',
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
            name: 'Come to Pass',
            patternHash: 2855733397,
          },
          {
            name: 'Tarnation',
            patternHash: 2371706208,
          },
          {
            name: 'Fel Taradiddle',
            patternHash: 138845773,
          },
          {
            name: "Father's Sins",
            patternHash: 408327437,
          },
        ],
      },
      {
        key: 'exotic',
        items: [
          {
            name: 'Edge of Action',
            patternHash: 1236909978,
          },
          {
            name: 'Edge of Concurrence',
            patternHash: 71883942,
          },
          {
            name: 'Edge of Intent',
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
            name: 'Edge of Action',
            patternHash: 0,
          },
          {
            name: 'Edge of Concurrence',
            patternHash: 0,
          },
          {
            name: 'Edge of Intent',
            patternHash: 0,
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
            name: 'Pardon Our Dust',
            patternHash: 2912878255,
          },
          {
            name: 'Wastelander M5',
            patternHash: 3591989262,
          },
          {
            name: 'BxR-55 Battler',
            patternHash: 8500040,
          },
          {
            name: 'Retraced Path',
            patternHash: 2467530584,
          },
          {
            name: 'Half-Truths',
            patternHash: 1558048189,
          },
          {
            name: 'The Other Half',
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
            name: 'Forensic Nightmare',
            patternHash: 312678365,
          },
        ],
      },
      {
        key: 'exotic',
        items: [
          {
            name: "Dead Man's Tale",
            patternHash: 1377069894,
          },
          {
            name: 'Revision Zero',
            patternHash: 2658740569,
          },
          {
            name: 'Osteo Striga',
            patternHash: 3891186874,
          },
          {
            name: 'Vexcalibur',
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
            name: 'Edge of Action',
            patternHash: 0,
          },
          {
            name: 'Edge of Concurrence',
            patternHash: 0,
          },
          {
            name: 'Edge of Intent',
            patternHash: 0,
          },
          {
            name: 'Dead Messenger',
            patternHash: 374313494,
          },
          {
            name: 'Revision Zero',
            patternHash: 0,
          },
          {
            name: "Dead Man's Tale",
            patternHash: 0,
          },
          {
            name: 'Vexcalibur',
            patternHash: 0,
          },
          {
            name: 'Wish-Keeper',
            patternHash: 0,
          },
        ],
      },
    ],
  },
];

export const FLAT_GROUPED_PATTERN_IDS = GROUPINGS.reduce<readonly number[]>(
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
  SUB_TEXT: '#aaa',
  BORDER: '#ddd',
  BORDER_FAINT: '#888',
  HIGHLIGHT: '#7af48b',
  BRAND: '#ff2c68',
} satisfies DefaultTheme;

export const ITEM_SUB_TYPE_SORT = [
  ItemSubType.HandCannon,
  ItemSubType.Sidearm,
  ItemSubType.AutoRifle,
  ItemSubType.PulseRifle,
  ItemSubType.ScoutRifle,
  ItemSubType.SubmachineGun,
  ItemSubType.Bow,
  ItemSubType.FusionRifle,
  ItemSubType.Glaive,
  ItemSubType.TraceRifle,
  ItemSubType.Shotgun,
  ItemSubType.SniperRifle,
  ItemSubType.GrenadeLauncher,
  ItemSubType.FusionRifleLine,
  ItemSubType.Machinegun,
  ItemSubType.RocketLauncher,
  ItemSubType.Sword,
];
