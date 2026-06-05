import type { ItemEquip } from "../../interfaces/Config";

const CQ = "conqueror/";

/** Vanity set `conqueror` — `equipSet` for catalog grouping: `conqueror` (file `conqueror.ts`). */
export const conquerorEquipment = [
  {
    id: "e.conquerors-cuisses",
    name: "Conqueror's Cuisses",
    equipSlot: "pants",
    imagePath: "/images/item-icons/conquerors-cuisses.png",
    equipType: "heavy-pants",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            { filename: CQ + "M05_PANTS", layer: "base" }
          ]
        }
      }
    }
  },
  {
    id: "e.conquerors-lamellar-cuirass",
    name: "Conqueror's Lamellar Cuirass",
    equipSlot: "chest",
    imagePath: "/images/item-icons/conquerors-lamellar-cuirass.png",
    equipType: "heavy-chest",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: CQ + "M05_CHESTOVER",
              layer: "base"
            }
          ],
          "1h mainhand": [
            {
              filename: CQ + "M05_ONEHLARM",
              layer: "base"
            }
          ],
          "1h offhand": [
            {
              filename: CQ + "M05_ONEHRARM",
              layer: "base"
            }
          ],
          "2h": [
            {
              filename: CQ + "M05_TWOHRARM",
              layer: "base"
            }
          ],
          "2h crossbow": [
            {
              filename: CQ + "M05_TWOHCBRARM",
              layer: "base"
            }
          ],
          "1h mainhand crossbow": [
            {
              filename: CQ + "M05_ONEHCBLARM",
              layer: "base"
            }
          ],
          "1h offhand crossbow": [
            {
              filename: CQ + "M05_ONEHCBRARM",
              layer: "base"
            }
          ],
          "throwing mainhand": [
            {
              filename: CQ + "M05_ARMLTHROWING",
              layer: "base"
            }
          ],
          "throwing offhand": [
            {
              filename: CQ + "M05_ARMRTHROWING",
              layer: "base"
            }
          ]
        }
      }
    }
  },
  {
    id: "e.conquerors-sabatons",
    name: "Conqueror's Sabatons",
    equipSlot: "boots",
    imagePath: "/images/item-icons/conquerors-sabatons.png",
    equipType: "heavy-boots",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: CQ + "M05_FOOTUNDER",
              layer: "base"
            }
          ]
        }
      }
    }
  },
  {
    id: "e.conquerors-sallet",
    name: "Conqueror's Sallet",
    equipSlot: "helm",
    imagePath: "/images/item-icons/conquerors-sallet.png",
    equipType: "heavy-helm",
    characterDisplay: {
      perSex: {
        male: {
          all: [{ filename: CQ + "M05_HELMET", layer: "base" }]
        }
      }
    }
  },
  {
    id: "e.conquerors-vambraces",
    name: "Conqueror's Vambraces",
    equipSlot: "gloves",
    imagePath: "/images/item-icons/conquerors-vambraces.png",
    equipType: "heavy-gloves"
  },
  {
    id: "e.jida-of-sovereign-hope",
    name: "Jida of Sovereign Hope",
    equipSlot: "off-hand",
    imagePath: "/images/item-icons/jida-of-sovereign-hope.png",
    equipType: "polearm"
  },
  {
    id: "e.saber-of-bloody-freedom",
    name: "Saber of Bloody Freedom",
    equipSlot: "main-hand",
    imagePath: "/images/item-icons/hooded-veil-slicer.png",
    equipType: "sword",
    characterDisplay: {
      perSex: {
        male: {
          "1h mainhand": [
            {
              filename: CQ + "M05_ONEHLWEAPON",
              layer: "under"
            }
          ]
        }
      }
    }
  }
] as const satisfies readonly ItemEquip[];
