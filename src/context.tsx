import { useIsClientRender } from '@blinkorb/resolute';
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { DBStore, SESSION_STORAGE_KEY } from './constants.js';
import { createDB, getDBValue, setDBValue } from './db.js';
import { PersistentState, StateContextValue } from './types.js';
import { allKeysAreDefined, getLanguage } from './utils.js';

const StateContext = createContext<
  readonly [
    StateContextValue | null,
    Dispatch<SetStateAction<StateContextValue>>,
  ]
>([
  null,
  () => {
    throw new Error('StateContext not initialized');
  },
]);

const StateProvider = ({ children }: PropsWithChildren) => {
  const dbRef = useRef<IDBDatabase | null>(null);
  const isClientRender = useIsClientRender();
  const [state, setState] = useState<StateContextValue>({
    dbInitialized: false,
    language: getLanguage(isClientRender),
    session: globalThis.sessionStorage
      ? JSON.parse(
          globalThis.sessionStorage.getItem(SESSION_STORAGE_KEY) ?? 'null'
        )
      : null,
    persistent: null,
  });

  useEffect(() => {
    const languageChange = () => {
      setState((prev) => ({
        ...prev,
        language: getLanguage(isClientRender),
      }));
    };

    languageChange();
    globalThis.addEventListener('languagechange', languageChange);

    return () => {
      globalThis.removeEventListener('languagechange', languageChange);
    };
  }, [isClientRender]);

  useEffect(() => {
    if (dbRef.current) {
      return;
    }

    const initDB = async () => {
      const db = await createDB();
      dbRef.current = db;

      const dbValues = await Promise.all(
        Object.values(DBStore).map(
          async (key) => [key, await getDBValue(db, key)] as const
        )
      );

      const persistent = Object.fromEntries(
        dbValues
      ) as unknown as Partial<PersistentState>;

      setState((prev) => {
        return {
          ...prev,
          dbInitialized: true,
          persistent: allKeysAreDefined(persistent) ? persistent : null,
        };
      });
    };

    initDB();
  }, []);

  const setStateWrapper = useCallback(
    (
      stateOrCallback:
        | StateContextValue
        | ((prev: StateContextValue) => StateContextValue)
    ) => {
      setState((prev) => {
        const nextState =
          typeof stateOrCallback === 'function'
            ? stateOrCallback(prev)
            : stateOrCallback;

        if (globalThis.sessionStorage) {
          globalThis.sessionStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify(nextState.session)
          );
        }

        if (dbRef.current) {
          Object.entries(nextState.persistent ?? {}).forEach(([key, value]) => {
            setDBValue(dbRef.current!, key as DBStore, value);
          });
        }

        return nextState;
      });
    },
    []
  );

  const value = useMemo(
    () => [state, setStateWrapper] as const,
    [state, setStateWrapper]
  );

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const useStateContext = () => {
  const [state, setState] = useContext(StateContext);

  if (!state) {
    throw new Error('useStateContext must be used within a StateProvider');
  }

  return useMemo(() => [state, setState] as const, [state, setState]);
};

export { StateProvider, useStateContext };
