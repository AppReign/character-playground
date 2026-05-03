import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `skliros` — `equipSet` for catalog grouping: `skliros` (file `skliros.ts`). */
export const sklirosEquipment = [
    {
      id: "e.skliros-cleaver",
      name: "Skliros' Cleaver",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/skliros-cleaver.png",
      equipType: "impact",
    },
    {
      id: "e.skliros-inflicter",
      name: "Skliros' Inflicter",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/skliros-inflicter.png",
      equipType: "staff",
    },
    {
      id: "e.skliros-punisher",
      name: "Skliros' Punisher",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/skliros-punisher.png",
      equipType: "crossbow",
    },
] as const satisfies readonly ItemEquip[];
