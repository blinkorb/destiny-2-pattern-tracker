import { DB_NAME, DB_VERSION, DBStore } from './constants.js';
import { StateContextValue } from './types.js';

export const createDB = () => {
  return new Promise<IDBDatabase>((resolve) => {
    let db: IDBDatabase | null = null;

    const DBOpenRequest = globalThis.indexedDB.open(DB_NAME, DB_VERSION);

    DBOpenRequest.onsuccess = () => {
      db = DBOpenRequest.result;

      resolve(db);
    };

    DBOpenRequest.onupgradeneeded = (event) => {
      db = (event.target as IDBOpenDBRequest).result;

      db.onerror = () => {
        // eslint-disable-next-line no-console
        console.error('Error loading DB');
      };

      if (!db.objectStoreNames.contains(DBStore.META)) {
        const objectStore = db.createObjectStore(DBStore.META);

        objectStore.createIndex('id', 'id', { unique: true });
      }

      if (!db.objectStoreNames.contains(DBStore.MANIFEST)) {
        const objectStore = db.createObjectStore(DBStore.MANIFEST);

        objectStore.createIndex('id', 'id', { unique: true });
      }

      if (!db.objectStoreNames.contains(DBStore.ITEMS)) {
        const objectStore = db.createObjectStore(DBStore.ITEMS);

        objectStore.createIndex('id', 'id', { unique: true });
      }

      if (!db.objectStoreNames.contains(DBStore.RECORDS)) {
        const objectStore = db.createObjectStore(DBStore.RECORDS);

        objectStore.createIndex('id', 'id', { unique: true });
      }

      if (!db.objectStoreNames.contains(DBStore.PRESENTATION_NODES)) {
        const objectStore = db.createObjectStore(DBStore.PRESENTATION_NODES);

        objectStore.createIndex('id', 'id', { unique: true });
      }
    };
  });
};

export const setDBValue = <T extends DBStore>(
  db: IDBDatabase,
  store: T,
  value: Exclude<StateContextValue['persistent'], null>[T]
) => {
  return new Promise<void>((resolve) => {
    const transaction = db.transaction([store], 'readwrite');

    transaction.onerror = () => {
      // eslint-disable-next-line no-console
      console.error('Error creating set transaction in DB');
    };

    const objectStore = transaction.objectStore(store);

    const objectStoreRequest = objectStore.put(value, store);

    objectStoreRequest.onerror = () => {
      // eslint-disable-next-line no-console
      console.error('Error setting claimed in DB');
    };

    objectStoreRequest.onsuccess = () => {
      resolve();
    };
  });
};

export const getDBValue = <T extends DBStore>(db: IDBDatabase, store: T) => {
  return new Promise<Exclude<StateContextValue['persistent'], null>[T]>(
    (resolve) => {
      const transaction = db.transaction([store], 'readonly');

      transaction.onerror = () => {
        // eslint-disable-next-line no-console
        console.error('Error creating get transaction in DB');
      };

      const objectStore = transaction.objectStore(store);

      const objectStoreRequest = objectStore.get(store);

      objectStoreRequest.onerror = () => {
        // eslint-disable-next-line no-console
        console.error('Error getting claimed in DB');
      };

      objectStoreRequest.onsuccess = () => {
        resolve(objectStoreRequest.result ?? undefined);
      };
    }
  );
};
