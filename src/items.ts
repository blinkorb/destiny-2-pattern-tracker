import { ItemsResponse, ItemType } from './types.js';
import { exists } from './utils.js';

export const onlyPatternsAndOutput = (items: ItemsResponse): ItemsResponse => {
  const entries = Object.entries(items);

  const patterns = Object.fromEntries(
    entries.filter(([, value]) => value.itemType === ItemType.Pattern)
  );

  const outputHashes = Object.values(patterns)
    .map((pattern) => pattern.crafting?.outputItemHash)
    .filter(exists);

  const outputItems = Object.fromEntries(
    entries.filter(([, value]) => outputHashes.includes(value.hash))
  );

  return {
    ...patterns,
    ...outputItems,
  };
};
