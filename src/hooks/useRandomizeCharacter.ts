import React, { useCallback } from "react";
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
  setChanging: SetChanging,
  catalog: ConfigPartEquipment[]
): () => void {
  return useCallback(() => {
    cleanCharacterUrlHash();
    const loadout = pickRandomEquipmentLoadout(catalog);
    const merged = loadout.map((p) => mergeEquipmentPartWithConfig(p, catalog));
    setChanging(true);
    window.setTimeout(() => setChanging(false), CHANGING_FLASH_MS);
    setEquippedItems(merged);
  }, [setEquippedItems, setChanging, catalog]);
}
