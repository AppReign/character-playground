import type { EquipmentSetBundle } from "../data/equipmentRegistry";
import type { ItemEquip } from "../interfaces/Config";
import {
  extractRequiredCharacterImages,
  type ExtractedImageRef
} from "./extractCharacterDisplayImages";

export type ItemValidationResult = {
  item: ItemEquip;
  refs: ExtractedImageRef[];
  /** True when `characterDisplay` exists and declares at least one drawable row. */
  done: boolean;
};

export type BundleValidationResult = {
  equipSet: string;
  itemsWithValidDisplay: number;
  itemsMissingValidDisplay: number;
  /** Every item in the set has a valid `characterDisplay`. */
  allItemsDone: boolean;
  items: ItemValidationResult[];
};

function itemHasValidCharacterDisplay(item: ItemEquip): boolean {
  if (!item.characterDisplay) return false;
  return extractRequiredCharacterImages(item).length > 0;
}

/** Validates drawable wiring only (no filesystem checks). */
export function validateEquipmentBundle(
  bundle: EquipmentSetBundle
): BundleValidationResult {
  const items: ItemValidationResult[] = bundle.items.map((item) => {
    const refs = extractRequiredCharacterImages(item);
    const done = itemHasValidCharacterDisplay(item);
    return { item, refs, done };
  });

  let itemsWithValidDisplay = 0;
  let itemsMissingValidDisplay = 0;
  for (const row of items) {
    if (row.done) itemsWithValidDisplay++;
    else itemsMissingValidDisplay++;
  }

  return {
    equipSet: bundle.equipSet,
    itemsWithValidDisplay,
    itemsMissingValidDisplay,
    allItemsDone: itemsMissingValidDisplay === 0,
    items
  };
}
