/** Single source of truth for slot ids and the `EquipSlot` union (production-style strings). */
export const EQUIP_SLOTS = [
  "helm",
  "chest",
  "main-hand",
  "off-hand",
  "pants",
  "boots",
  "gloves",
  "ring",
  "mount"
] as const;

export type EquipSlot = (typeof EQUIP_SLOTS)[number];

const equipSlots: EquipSlot[] = [...EQUIP_SLOTS];

export default equipSlots;
