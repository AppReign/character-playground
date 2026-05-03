import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `legacy` — `equipSet` for catalog grouping: `legacy` (file `legacy.ts`). */
export const legacyEquipment = [
    {
      id: "e.blade-of-mestari",
      name: "Blade of Mestari",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/blade-of-mestari.png",
      equipType: "sword",
    },
    {
      id: "e.legacy-greatshield",
      name: "Legacy Greatshield",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/legacy-greatshield.png",
      equipType: "medium-shield",
    },
    {
      id: "e.mestari-dragonslayer-blue",
      name: "Mestari Dragonslayer - Blue",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/mestari-dragonslayer-blue.png",
      equipType: "sword",
    },
    {
      id: "e.mestari-dragonslayer-green",
      name: "Mestari Dragonslayer - Green",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/mestari-dragonslayer-green.png",
      equipType: "sword",
    },
    {
      id: "e.mestari-dragonslayer-indigo",
      name: "Mestari Dragonslayer - Indigo",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/mestari-dragonslayer-violet.png",
      equipType: "sword",
    },
    {
      id: "e.mestari-dragonslayer-orange",
      name: "Mestari Dragonslayer - Orange",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/mestari-dragonslayer-orange.png",
      equipType: "sword",
    },
    {
      id: "e.mestari-dragonslayer-red",
      name: "Mestari Dragonslayer - Red",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/mestari-dragonslayer-red.png",
      equipType: "sword",
    },
    {
      id: "e.mestari-dragonslayer-violet",
      name: "Mestari Dragonslayer - Violet",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/mestari-dragonslayer-indigo.png",
      equipType: "sword",
    },
    {
      id: "e.mestari-dragonslayer-yellow",
      name: "Mestari Dragonslayer - Yellow",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/mestari-dragonslayer-yellow.png",
      equipType: "sword",
    },
] as const satisfies readonly ItemEquip[];
