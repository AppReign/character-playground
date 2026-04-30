import React, { useCallback } from "react";
import allEquipmentItems from "../config/allEquipmentItems";
import { ConfigPartEquipment } from "../interfaces/Config";
import { cleanCharacterUrlHash } from "../utils/cleanCharacterUrlHash";
import { mergeEquipmentPartWithConfig } from "../utils/mergeEquipmentPartWithConfig";
import { pickRandomEquipmentLoadout } from "../utils/pickRandomEquipmentLoadout";

type SetEquippedItems = React.Dispatch<
  React.SetStateAction<ConfigPartEquipment[]>
>;
type SetChanging = React.Dispatch<React.SetStateAction<boolean>>;

const CHANGING_FLASH_MS = 500;

export function useRandomizeCharacter(
  setEquippedItems: SetEquippedItems,
  setChanging: SetChanging
): () => void {
  return useCallback(() => {
    cleanCharacterUrlHash();
    const loadout = pickRandomEquipmentLoadout();
    const merged = loadout.map((p) =>
      mergeEquipmentPartWithConfig(p, allEquipmentItems)
    );
    setChanging(true);
    window.setTimeout(() => setChanging(false), CHANGING_FLASH_MS);
    setEquippedItems(merged);
  }, [setEquippedItems, setChanging]);
}
