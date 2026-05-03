import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `sinderklaz` — `equipSet` for catalog grouping: `sinderklaz` (file `sinderklaz.ts`). */
export const sinderklazEquipment = [
    {
      id: "e.sinderklaz-bol",
      name: "Sinderklaz Bol",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/sinderklaz_bol.png",
      equipType: "orb",
    },
    {
      id: "e.sinderklaz-boots",
      name: "Sinderklaz Boots",
      equipSlot: "boots",
      imagePath: "/images/item-icons/sinderklaz_boots.png",
      equipType: "light-boots",
    },
    {
      id: "e.sinderklaz-coat",
      name: "Sinderklaz Coat",
      equipSlot: "chest",
      imagePath: "/images/item-icons/sinderklaz_coat.png",
      equipType: "light-chest",
    },
    {
      id: "e.sinderklaz-gloves",
      name: "Sinderklaz Gloves",
      equipSlot: "gloves",
      imagePath: "/images/item-icons/sinderklaz_gloves.png",
      equipType: "light-gloves",
    },
    {
      id: "e.sinderklaz-hat",
      name: "Sinderklaz Hat",
      equipSlot: "helm",
      imagePath: "/images/item-icons/sinderklaz_hat.png",
      equipType: "light-helm",
    },
    {
      id: "e.sinderklaz-pants",
      name: "Sinderklaz Pants",
      equipSlot: "pants",
      imagePath: "/images/item-icons/sinderklaz_pants.png",
      equipType: "light-pants",
    },
    {
      id: "e.sinderklaz-shield",
      name: "Sinderklaz Shield",
      equipSlot: "off-hand",
      imagePath: "/images/item-icons/sinderklaz_shield.png",
      equipType: "buckler-shield",
    },
    {
      id: "e.sinderklaz-spihlgode",
      name: "Sinderklaz Spihlgode",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/sinderklaz_spihlgode.png",
      equipType: "thrown",
    },
    {
      id: "e.sinderklaz-zurstok",
      name: "Sinderklaz Zurstok",
      equipSlot: "main-hand",
      imagePath: "/images/item-icons/sinderklaz_zurstok.png",
      equipType: "sword",
    },
] as const satisfies readonly ItemEquip[];
