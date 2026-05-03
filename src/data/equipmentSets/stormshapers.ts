import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `stormshapers` — `equipSet` for catalog grouping: `stormshapers` (file `stormshapers.ts`). */
export const stormshapersEquipment = [
    {
      id: "e.stormshapers-armor",
      name: "Stormshapers' Armor",
      equipSlot: "chest",
      imagePath: "/images/item-icons/stormshapers-armor.png",
      equipType: "heavy-chest",
    },
    {
      id: "e.stormshapers-boots",
      name: "Stormshapers' Boots",
      equipSlot: "boots",
      imagePath: "/images/item-icons/stormshapers-boots.png",
      equipType: "heavy-boots",
    },
    {
      id: "e.stormshapers-bracers",
      name: "Stormshapers' Bracers",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/stormshapers-bracers.png",
      equipType: "heavy-gloves",
    },
    {
      id: "e.stormshapers-carver",
      name: "Stormshapers' Carver",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/stormshapers-carver.png",
      equipType: "sword",
    },
    {
      id: "e.stormshapers-charge",
      name: "Stormshapers' Charge",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/stormshapers-charge.png",
      equipType: "thrown",
    },
    {
      id: "e.stormshapers-cuisses",
      name: "Stormshapers' Cuisses",
      equipSlot: "pants",
      imagePath: "/images/item-icons/stormshapers-cuisses.png",
      equipType: "heavy-pants",
    },
    {
      id: "e.stormshapers-focus",
      name: "Stormshapers' Focus",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/stormshapers-focus.png",
      equipType: "staff",
    },
    {
      id: "e.stormshapers-guide",
      name: "Stormshapers' Guide",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/stormshapers-guide.png",
      equipType: "thrown",
    },
    {
      id: "e.stormshapers-helm",
      name: "Stormshapers' Helm",
      equipSlot: "helm",
      imagePath: "/images/item-icons/stormshapers-helm.png",
      equipType: "heavy-helm",
    },
    {
      id: "e.stormshapers-point",
      name: "Stormshapers' Point",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/stormshapers-point.png",
      equipType: "dagger",
    },
    {
      id: "e.stormshapers-spark",
      name: "Stormshapers' Spark",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/stormshapers-spark.png",
      equipType: "wand",
    },
] as const satisfies readonly ItemEquip[];
