import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './constants.js';
import { SupportedLanguage } from './types.js';

export const getLanguage = (isClientRender: boolean): SupportedLanguage => {
  if (!isClientRender) {
    return DEFAULT_LANGUAGE;
  }

  const language = globalThis.navigator.language.toLowerCase();

  if (SUPPORTED_LANGUAGES.includes(language as SupportedLanguage)) {
    return language as SupportedLanguage;
  }

  const roughLanguage = language.split('-')[0];

  if (SUPPORTED_LANGUAGES.includes(roughLanguage as SupportedLanguage)) {
    return roughLanguage as SupportedLanguage;
  }

  return DEFAULT_LANGUAGE;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logInfo = (...inputs: readonly any[]) => {
  if (globalThis.console && globalThis.console.info) {
    globalThis.console.info(...inputs);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logError = (...inputs: readonly any[]) => {
  if (globalThis.console && globalThis.console.error) {
    globalThis.console.error(...inputs);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allKeysAreDefined = <T extends Record<string, any>>(
  input: Partial<T>
): input is T => {
  return Object.values(input).every((value) => typeof value !== 'undefined');
};
