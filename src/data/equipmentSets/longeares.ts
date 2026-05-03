import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set `longeares` — `equipSet` for catalog grouping: `longeares` (file `longeares.ts`). */
export const longearesEquipment = [
    {
      id: "e.helm-of-longeares",
      name: "Helm of Longeares",
      equipSlot: "helm",
      imagePath: "/images/item-icons/helm-of-longeares.png",
      equipType: "light-helm",
    },
] as const satisfies readonly ItemEquip[];
