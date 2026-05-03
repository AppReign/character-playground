import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `veiled-griphornis` — `equipSet` for catalog grouping: `veiledGriphornis` (file `veiledGriphornis.ts`). */
export const veiledGriphornisEquipment = [
    {
      id: "e.veiled-griphornis-beak",
      name: "Veiled Griphornis Beak",
      equipSlot: "helm",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-helm",
    },
    {
      id: "e.veiled-griphornis-darts",
      name: "Veiled Griphornis Darts",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/veiled-griphornis-darts.png",
      equipType: "darts",
    },
    {
      id: "e.veiled-griphornis-feathers",
      name: "Veiled Griphornis Feathers",
      equipSlot: "chest",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-chest",
    },
    {
      id: "e.veiled-griphornis-pants",
      name: "Veiled Griphornis Pants",
      equipSlot: "pants",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-pants",
    },
    {
      id: "e.veiled-griphornis-sickles",
      name: "Veiled Griphornis Sickles",
      equipSlot: "off-hand",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "thrown",
    },
    {
      id: "e.veiled-griphornis-talons",
      name: "Veiled Griphornis Talons",
      equipSlot: "boots",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-boots",
    },
    {
      id: "e.veiled-griphornis-wings",
      name: "Veiled Griphornis Wings",
      equipSlot: "gloves",
      imagePath: "/images/item/ui/question_mark.png",
      equipType: "medium-gloves",
    },
] as const satisfies readonly ItemEquip[];
