import { useCallback } from 'react';

import { DEFAULT_LANGUAGE } from './constants.js';
import { useStateContext } from './context.js';
import { SupportedLanguage } from './types.js';
import { logError } from './utils.js';

const TRANSLATIONS = {
  en: {
    d2pt: 'D2PT',
    destiny2PatternTracker: 'Destiny 2 Pattern Tracker',
    intro:
      'Track your Destiny 2 craftable weapons & pattern progress across seasons, raids, and other activities. Login to get started.',
    javascriptDisabled:
      'Javascript is disabled. This site requires Javascript to run.',
    byBlinkOrb: 'Made by BlinkOrb',
    contribute: 'Contribute on GitHub',
    onGitHub: 'Destiny 2 Pattern Tracker on GitHub',
    loading: 'Loading',
    loadingManifest: 'Loading manifest',
    loadingItems: 'Loading items (this takes a while)',
    authenticationExpired: 'Authentication expired. This happens every hour.',
    pleaseLoginAgain: 'Please login again.',
    login: 'Login',
    logout: 'Logout',
    seasonOfTheWitch: 'Season of the Witch',
    seasonOfTheDeep: 'Season of the Deep',
    seasonOfDefiance: 'Season of Defiance',
    seasonOfTheSeraph: 'Season of the Seraph',
    seasonOfPlunder: 'Season of Plunder',
    seasonOfTheHaunted: 'Season of the Haunted',
    seasonOfTheRisen: 'Season of the Risen',
    lightfall: 'Lightfall',
    theWitchQueen: 'The Witch Queen',
    duality: 'Duality',
    crotasEnd: "Crota's End",
    rootOfNightmares: 'Root of Nightmares',
    kingsFall: "King's Fall",
    vowOfTheDisciple: 'Vow of the Disciple',
    vaultOfGlass: 'Vault of Glass',
    deepStoneCrypt: 'Deep Stone Crypt',
    gardenOfSalvation: 'Garden of Salvation',
    lastWish: 'Last Wish',
    wellSpring: 'Well Spring',
    evidenceBoard: 'Evidence Board',
    daresOfEternity: 'Dares of Eternity',
    exotic: 'Exotic',
    quest: 'Quest',
    ungroupedWorldDrop: 'Ungrouped / World Drop',
  },
} satisfies Partial<Record<SupportedLanguage, Partial<Record<string, string>>>>;

export type TranslationKey =
  keyof (typeof TRANSLATIONS)[keyof typeof TRANSLATIONS];

export const useTranslate = () => {
  const [{ language }] = useStateContext();

  const translate = useCallback(
    (key: keyof (typeof TRANSLATIONS)[keyof typeof TRANSLATIONS]) => {
      if (language in TRANSLATIONS) {
        const translation =
          TRANSLATIONS[language as keyof typeof TRANSLATIONS]?.[key];

        if (typeof translation !== 'string') {
          logError(`No translation for key "${key}" in language "${language}"`);
          return `Missing translation for key "${key}" in language "${language}"`;
        }

        return translation;
      }

      const translation = TRANSLATIONS[DEFAULT_LANGUAGE][key];

      if (typeof translation !== 'string') {
        logError(
          `No translation for key "${key}" in language "${DEFAULT_LANGUAGE}"`
        );
        return `Missing translation for key "${key}" in language "${DEFAULT_LANGUAGE}"`;
      }

      return translation;
    },
    [language]
  );

  return translate;
};
