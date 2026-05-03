import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `caligae` — `equipSet` for catalog grouping: `caligae` (file `caligae.ts`). */
export const caligaeEquipment = [
    {
      id: "e.gipantan-caligae",
      name: "Gipantan Caligae",
      equipSlot: "boots",
      imagePath: "/images/item-icons/gipantan-caligae.png",
      equipType: "light-boots",
    },
    {
      id: "e.thiadoran-sandals",
      name: "Thiadoran Sandals",
      equipSlot: "boots",
      imagePath: "/images/item-icons/thiadoran-sandals.png",
      equipType: "light-boots",
    },
    {
      id: "e.vozotls-treads",
      name: "Vozotl's Treads",
      equipSlot: "boots",
      imagePath: "/images/item-icons/vozotls-tread.png",
      equipType: "light-boots",
    },
] as const satisfies readonly ItemEquip[];
