import React, { useEffect } from "react";
import { ConfigPart, ConfigPartEquipment } from "../interfaces/Config";
import { mergeEquipmentPartWithConfig } from "../utils/mergeEquipmentPartWithConfig";

function isEquipmentPart(part: ConfigPart): part is ConfigPartEquipment {
  return "equipSlot" in part && Boolean((part as ConfigPartEquipment).equipSlot);
}

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
  setChanging: SetChanging,
  catalog: ConfigPartEquipment[]
): void {
  useEffect(() => {
    if (!catalog.length) return;

    const characterBase64 = window.location.hash.split("#")[1];
    if (!characterBase64) return;

    let savedParts: ConfigPart[];
    try {
      savedParts = JSON.parse(atob(characterBase64));
    } catch {
      return;
    }

    setChanging(true);
    setTimeout(() => setChanging(false), 500);
    const savedEquipment = savedParts.filter(isEquipmentPart);
    setEquippedItems(
      savedEquipment.map((p) => mergeEquipmentPartWithConfig(p, catalog))
    );
  }, [setEquippedItems, setChanging, catalog]);
}
