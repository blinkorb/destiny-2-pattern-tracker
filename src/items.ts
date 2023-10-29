import { ITEM_SUB_TYPE_SORT } from './constants.js';
import {
  EquipmentSlotResponse,
  ItemsResponse,
  ItemType,
  PatternWithCompletion,
} from './types.js';
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

export const bySlotThenTypeThenName = (
  a: PatternWithCompletion,
  b: PatternWithCompletion,
  items: ItemsResponse | null | undefined,
  equipmentSlot: EquipmentSlotResponse | null | undefined
) => {
  if (!items || !equipmentSlot) {
    return 0;
  }

  const aOutputItemHash = a.crafting?.outputItemHash;
  const aOutput =
    typeof aOutputItemHash !== 'undefined' ? items[aOutputItemHash] : undefined;
  const aEquipmentSlotTypeHash = aOutput?.equippingBlock?.equipmentSlotTypeHash;
  const aSlotIndex =
    typeof aEquipmentSlotTypeHash !== 'undefined'
      ? equipmentSlot[aEquipmentSlotTypeHash]?.index
      : undefined;

  const outputItemHashB = b.crafting?.outputItemHash;
  const bOutput =
    typeof outputItemHashB !== 'undefined' ? items[outputItemHashB] : undefined;
  const bEquipmentSlotTypeHash = bOutput?.equippingBlock?.equipmentSlotTypeHash;
  const bSlotIndex =
    typeof bEquipmentSlotTypeHash !== 'undefined'
      ? equipmentSlot[bEquipmentSlotTypeHash]?.index
      : undefined;

  if (
    typeof aSlotIndex !== 'undefined' &&
    typeof bSlotIndex !== 'undefined' &&
    aSlotIndex > bSlotIndex
  ) {
    return 1;
  }

  if (
    typeof aSlotIndex !== 'undefined' &&
    typeof bSlotIndex !== 'undefined' &&
    aSlotIndex < bSlotIndex
  ) {
    return -1;
  }

  const aSubTypeIndex = ITEM_SUB_TYPE_SORT.indexOf(a.itemSubType);
  const bSubTypeIndex = ITEM_SUB_TYPE_SORT.indexOf(b.itemSubType);

  if (aSubTypeIndex === -1 && bSubTypeIndex !== -1) {
    return 1;
  }

  if (bSubTypeIndex === -1 && aSubTypeIndex !== -1) {
    return -1;
  }

  if (aSubTypeIndex > bSubTypeIndex) {
    return 1;
  }

  if (aSubTypeIndex < bSubTypeIndex) {
    return -1;
  }

  if (a.displayProperties.name > b.displayProperties.name) {
    return 1;
  }

  if (a.displayProperties.name < b.displayProperties.name) {
    return -1;
  }

  return 0;
};
