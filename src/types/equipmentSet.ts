import type { ItemEquip } from "../interfaces/Config";

export type EquipmentSetBundle = {
  equipSet: string;
  items: readonly ItemEquip[];
};
