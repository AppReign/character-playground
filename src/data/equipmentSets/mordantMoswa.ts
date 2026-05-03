import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `mordant-moswa` — `equipSet` for catalog grouping: `mordantMoswa` (file `mordantMoswa.ts`). */
export const mordantMoswaEquipment = [
    {
      id: "e.mordant-moswa-antlers",
      name: "Mordant Moswa Antlers",
      equipSlot: "helm",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-helm",
    },
    {
      id: "e.mordant-moswa-fur",
      name: "Mordant Moswa Fur",
      equipSlot: "chest",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-chest",
    },
    {
      id: "e.mordant-moswa-gloves",
      name: "Mordant Moswa Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-gloves",
    },
    {
      id: "e.mordant-moswa-hooves",
      name: "Mordant Moswa Hooves",
      equipSlot: "boots",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-boots",
    },
    {
      id: "e.mordant-moswa-pants",
      name: "Mordant Moswa Pants",
      equipSlot: "pants",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "light-pants",
    },
    {
      id: "e.mordant-moswas-orb",
      name: "Mordant Moswa's Orb",
      equipSlot: "off-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "orb",
    },
    {
      id: "e.mordant-moswas-wand",
      name: "Mordant Moswa's Wand",
      equipSlot: "main-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "wand",
    },
] as const satisfies readonly ItemEquip[];
