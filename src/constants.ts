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
  {
    key: 'seasonOfTheWish',
    groups: [
      {
        key: 'wish',
        items: [
          {
            name: 'Supercluster',
            patternHash: 867013661,
          },
          {
            name: 'Scatter Signal',
            patternHash: 3043056966,
          },
          {
            name: 'Appetence',
            patternHash: 1842249748,
          },
          {
            name: 'Lethophobia',
            patternHash: 3094270359,
          },
          {
            name: 'Scalar Potential',
            patternHash: 4184075964,
          },
          {
            name: 'Doomed Petitioner',
            patternHash: 936723022,
          },
        ],
      },
      {
        key: 'undying',
        items: [
          {
            name: 'Imperative',
            patternHash: 3327760373,
          },
          {
            name: 'Subjunctive',
            patternHash: 3690763405,
          },
          {
            name: 'Adhortative',
            patternHash: 3174951648,
          },
          {
            name: 'Optative',
            patternHash: 499726185,
          },
        ],
      },
    ],
  },
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
            patternHash: 12689138,
          },
          {
            name: 'Throne-Cleaver',
            patternHash: 3300916517,
          },
          {
            name: 'Goldtusk',
            patternHash: 1293340523,
          },
          {
            name: "Death's Razor",
            patternHash: 1617767144,
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
            patternHash: 391424247,
          },
          {
            name: 'Blood Feud',
            patternHash: 1190630124,
          },
          {
            name: "Brigand's Law",
            patternHash: 3838104479,
          },
          {
            name: 'Tarnished Mettle',
            patternHash: 894815256,
          },
          {
            name: "Planck's Stride",
            patternHash: 961659165,
          },
          {
            name: 'Sailspy Pitchglass',
            patternHash: 3512723176,
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
            patternHash: 2727300465,
          },
          {
            name: 'Firefright',
            patternHash: 3976812977,
          },
          {
            name: 'Without Remorse',
            patternHash: 78936099,
          },
          {
            name: "Nezarec's Whisper",
            patternHash: 1782799708,
          },
          {
            name: 'Hollow Denial',
            patternHash: 4032870516,
          },
          {
            name: 'Bump in the Night',
            patternHash: 3783874323,
          },
        ],
      },
      {
        key: 'secondary',
        items: [
          {
            name: 'Austringer',
            patternHash: 2491859962,
          },
          {
            name: 'Drang (Baroque)',
            patternHash: 1821223866,
          },
          {
            name: 'CALUS Mini-Tool',
            patternHash: 1624712678,
          },
          {
            name: 'Beloved',
            patternHash: 3882576915,
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
            patternHash: 3257476351,
          },
          {
            name: 'Piece of Mind',
            patternHash: 1921074348,
          },
          {
            name: 'Under Your Skin',
            patternHash: 3409008359,
          },
          {
            name: 'Explosive Personality',
            patternHash: 4116268584,
          },
          {
            name: 'Thoughtless',
            patternHash: 3153641810,
          },
          {
            name: 'Recurrent Impact',
            patternHash: 1750107494,
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
            patternHash: 3448423264,
          },
          {
            name: 'Empirical Evidence',
            patternHash: 152053718,
          },
          {
            name: 'Red Herring',
            patternHash: 1854958272,
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
            patternHash: 3781421154,
          },
          {
            name: 'Fixed Odds',
            patternHash: 2307652914,
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
            patternHash: 2654424424,
          },
          {
            name: 'Smite of Merain',
            patternHash: 3288327145,
          },
          {
            name: "Midha's Reckoning",
            patternHash: 4179698628,
          },
          {
            name: 'Doom of Chelchis',
            patternHash: 479338636,
          },
          {
            name: 'Defiance of Yasmin',
            patternHash: 1188055361,
          },
          {
            name: "Qullim's Terminus",
            patternHash: 4057799392,
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
            patternHash: 73105274,
          },
          {
            name: 'Insidious',
            patternHash: 2700944123,
          },
          {
            name: 'Deliverance',
            patternHash: 3994951926,
          },
          {
            name: 'Forbearance',
            patternHash: 3956489672,
          },
          {
            name: "Lubrae's Ruin",
            patternHash: 1965716037,
          },
          {
            name: 'Cataclysmic',
            patternHash: 517759838,
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
            patternHash: 3800406805,
          },
          {
            name: 'Heritage',
            patternHash: 3240588666,
          },
          {
            name: 'Trustee',
            patternHash: 1363479969,
          },
          {
            name: 'Succession',
            patternHash: 283210738,
          },
          {
            name: 'Bequest',
            patternHash: 1697198067,
          },
          {
            name: 'Commemoration',
            patternHash: 4154790607,
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
            patternHash: 2768185586,
          },
          {
            name: 'Tarnation',
            patternHash: 1272458185,
          },
          {
            name: 'Fel Taradiddle',
            patternHash: 2743521280,
          },
          {
            name: "Father's Sins",
            patternHash: 59063294,
          },
        ],
      },
      {
        key: 'exotic',
        items: [
          {
            name: 'Edge of Action',
            patternHash: 4284608583,
          },
          {
            name: 'Edge of Concurrence',
            patternHash: 3127165437,
          },
          {
            name: 'Edge of Intent',
            patternHash: 1665561856,
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
            patternHash: 4284608583,
          },
          {
            name: 'Edge of Concurrence',
            patternHash: 3127165437,
          },
          {
            name: 'Edge of Intent',
            patternHash: 1665561856,
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
            patternHash: 2521448082,
          },
          {
            name: 'Wastelander M5',
            patternHash: 2299191415,
          },
          {
            name: 'BxR-55 Battler',
            patternHash: 2632206613,
          },
          {
            name: 'Retraced Path',
            patternHash: 958118965,
          },
          {
            name: 'Half-Truths',
            patternHash: 1834163582,
          },
          {
            name: 'The Other Half',
            patternHash: 1969364529,
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
            patternHash: 1914687106,
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
            patternHash: 3364580479,
          },
          {
            name: 'Vexcalibur',
            patternHash: 4223953031,
          },
          {
            name: 'Outbreak Perfected',
            patternHash: 3342878104,
          },
          {
            name: 'Whisper of the Worm',
            patternHash: 3739748319,
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
            patternHash: 4284608583,
          },
          {
            name: 'Edge of Concurrence',
            patternHash: 3127165437,
          },
          {
            name: 'Edge of Intent',
            patternHash: 1665561856,
          },
          {
            name: 'Dead Messenger',
            patternHash: 374313494,
          },
          {
            name: 'Revision Zero',
            patternHash: 2658740569,
          },
          {
            name: "Dead Man's Tale",
            patternHash: 1377069894,
          },
          {
            name: 'Vexcalibur',
            patternHash: 4223953031,
          },
          {
            name: 'Wish-Keeper',
            patternHash: 682995262,
          },
          {
            name: 'Outbreak Perfected',
            patternHash: 3342878104,
          },
          {
            name: 'Whisper of the Worm',
            patternHash: 3739748319,
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
