import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `scolfield` — `equipSet` for catalog grouping: `scolfield` (file `scolfield.ts`). */
export const scolfieldEquipment = [
    {
      id: "e.scolfields-bergere",
      name: "Scolfield's Bergère",
      equipSlot: "helm",
      imagePath: "/images/item-icons/scolfields-bergere.png",
      equipType: "light-helm",
    },
    {
      id: "e.scolfields-bodice",
      name: "Scolfield's Bodice",
      equipSlot: "chest",
      imagePath: "/images/item-icons/scolfields-bodice.png",
      equipType: "light-chest",
    },
    {
      id: "e.scolfields-gloves",
      name: "Scolfield's Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/scolfields-gloves.png",
      equipType: "light-gloves",
    },
    {
      id: "e.scolfields-heels",
      name: "Scolfield's Heels",
      equipSlot: "boots",
      imagePath: "/images/item-icons/scolfields-heels.png",
      equipType: "light-boots",
    },
    {
      id: "e.scolfields-lash",
      name: "Scolfield's Lash",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/scolfields-lash.png",
      equipType: "whip",
    },
    {
      id: "e.scolfields-skirts",
      name: "Scolfield's Skirts",
      equipSlot: "pants",
      imagePath: "/images/item-icons/scolfields-skirts.png",
      equipType: "light-pants",
    },
    {
      id: "e.scolfields-wand",
      name: "Scolfield's Wand",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/scolfields-wand.png",
      equipType: "wand",
    },
] as const satisfies readonly ItemEquip[];
