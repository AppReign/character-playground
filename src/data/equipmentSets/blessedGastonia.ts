import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `blessed-gastonia` — `equipSet` for catalog grouping: `blessedGastonia` (file `blessedGastonia.ts`). */
export const blessedGastoniaEquipment = [
    {
      id: "e.blessed-gastonia-boots",
      name: "Blessed Gastonia Boots",
      equipSlot: "boots",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-boots",
    },
    {
      id: "e.blessed-gastonia-clubbed-whip",
      name: "Blessed Gastonia Clubbed Whip",
      equipSlot: "main-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "whip",
    },
    {
      id: "e.blessed-gastonia-gloves",
      name: "Blessed Gastonia Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-gloves",
    },
    {
      id: "e.blessed-gastonia-helm",
      name: "Blessed Gastonia Helm",
      equipSlot: "helm",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-helm",
    },
    {
      id: "e.blessed-gastonia-pants",
      name: "Blessed Gastonia Pants",
      equipSlot: "pants",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-pants",
    },
    {
      id: "e.blessed-gastonia-shield",
      name: "Blessed Gastonia Shield",
      equipSlot: "off-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-shield",
    },
    {
      id: "e.blessed-gastonia-spikes",
      name: "Blessed Gastonia Spikes",
      equipSlot: "chest",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-chest",
    },
] as const satisfies readonly ItemEquip[];
