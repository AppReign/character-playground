import React, { useEffect } from "react";
import partsBase from "../config/partsBase";
import allEquipmentItems from "../config/allEquipmentItems";
import { ConfigPart, ConfigPartEquipment } from "../interfaces/Config";
import { mergeEquipmentPartWithConfig } from "../utils/mergeEquipmentPartWithConfig";

const basePartNames = new Set(partsBase.map((p) => p.name));

type SetEquippedItems = React.Dispatch<
  React.SetStateAction<ConfigPartEquipment[]>
>;
type SetChanging = React.Dispatch<React.SetStateAction<boolean>>;

/**
 * On mount, if `window.location.hash` holds base64 JSON of parts, restores equipment
 * (non-base parts) and briefly sets the "changing" flash state.
 */
export function useLoadEquipmentFromUrlHash(
  setEquippedItems: SetEquippedItems,
  setChanging: SetChanging
): void {
  useEffect(() => {
    const characterBase64 = window.location.hash.split("#")[1];
    if (!characterBase64) return;

    const savedParts: ConfigPart[] = JSON.parse(atob(characterBase64));
    setChanging(true);
    setTimeout(() => setChanging(false), 500);
    const savedEquipment = savedParts.filter((p) => !basePartNames.has(p.name));
    setEquippedItems(
      savedEquipment.map((p) => mergeEquipmentPartWithConfig(p, allEquipmentItems))
    );
  }, [setEquippedItems, setChanging]);
}
