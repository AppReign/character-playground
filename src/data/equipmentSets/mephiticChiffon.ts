import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `mephitic-chiffon` — `equipSet` for catalog grouping: `mephiticChiffon` (file `mephiticChiffon.ts`). */
export const mephiticChiffonEquipment = [
    {
      id: "e.mephitic-chiffon-buckler-shield",
      name: "Mephitic Chiffon Buckler Shield",
      equipSlot: "off-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "buckler-shield",
    },
    {
      id: "e.mephitic-chiffon-cap",
      name: "Mephitic Chiffon Cap",
      equipSlot: "helm",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-helm",
    },
    {
      id: "e.mephitic-chiffon-fur",
      name: "Mephitic Chiffon Fur",
      equipSlot: "chest",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-chest",
    },
    {
      id: "e.mephitic-chiffon-gloves",
      name: "Mephitic Chiffon Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-gloves",
    },
    {
      id: "e.mephitic-chiffon-hooves",
      name: "Mephitic Chiffon Hooves",
      equipSlot: "boots",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-boots",
    },
    {
      id: "e.mephitic-chiffon-pants",
      name: "Mephitic Chiffon Pants",
      equipSlot: "pants",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-pants",
    },
    {
      id: "e.mephitic-chiffon-staff",
      name: "Mephitic Chiffon Staff",
      equipSlot: "main-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "staff",
    },
] as const satisfies readonly ItemEquip[];
