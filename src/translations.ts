import { useCallback } from 'react';

import { DEFAULT_LANGUAGE } from './constants.js';
import { useStateContext } from './context.js';
import { SupportedLanguage } from './types.js';
import { logError } from './utils.js';

const TRANSLATIONS = {
  en: {
    loading: 'Loading',
    loadingManifest: 'Loading manifest',
    loadingItems: 'Loading items (this takes a while)',
    loadingRecords: 'Loading records',
    loadingPresentationNodes: 'Loading presentation nodes',
    authenticationExpired: 'Authentication expired. This happens every hour.',
    pleaseLoginAgain: 'Please login again.',
    login: 'Login',
    logout: 'Logout',
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
