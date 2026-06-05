import type { ItemEquip } from "../../interfaces/Config";

const BW = "bassinianWarder/";

/** Vanity set `bassinian-warder` — `equipSet` for catalog grouping: `bassinianWarder` (file `bassinianWarder.ts`). */
export const bassinianWarderEquipment = [
  {
    id: "e.bassinian-warder-breeches",
    name: "Bassinian Warder Breeches",
    equipSlot: "pants",
    imagePath: "/images/item-icons/bassinian-warder-breeches.png",
    equipType: "light-pants",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: BW + "M04_PANTSOVER",
              layer: "base"
            }
          ]
        }
      }
    }
  },
  {
    id: "e.bassinian-warder-coat",
    name: "Bassinian Warder Coat",
    equipSlot: "chest",
    imagePath: "/images/item-icons/bassinian-warder-coat.png",
    equipType: "light-chest",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: BW + "M04_CHESTOVER",
              layer: "base"
            }
          ],
          "1h mainhand": [
            {
              filename: BW + "M04_ONEHLARM",
              layer: "base"
            }
          ],
          "1h offhand": [
            {
              filename: BW + "M04_ONEHRARM",
              layer: "base"
            }
          ],
          "2h": [
            {
              filename: BW + "M04_TWOHRARM",
              layer: "base"
            }
          ],
          "2h crossbow": [
            {
              filename: BW + "M04_TWOHCBRARM",
              layer: "base"
            }
          ],
          "1h mainhand crossbow": [
            {
              filename: BW + "M04_ONEHCBLARM",
              layer: "base"
            }
          ],
          "1h offhand crossbow": [
            {
              filename: BW + "M04_ONEHCBRARM",
              layer: "base"
            }
          ],
          "throwing mainhand": [
            {
              filename: BW + "M04_ARMLTHROWING",
              layer: "base"
            }
          ],
          "throwing offhand": [
            {
              filename: BW + "M04_ARMRTHROWING",
              layer: "base"
            }
          ]
        }
      }
    }
  },
  {
    id: "e.bassinian-warder-gloves",
    name: "Bassinian Warder Gloves",
    equipSlot: "gloves",
    imagePath: "/images/item-icons/bassinian-warder-gloves.png",
    equipType: "light-gloves"
  },
  {
    id: "e.bassinian-warder-hat",
    name: "Bassinian Warder Hat",
    equipSlot: "helm",
    imagePath: "/images/item-icons/bassinian-warder-hat.png",
    equipType: "light-helm",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            { filename: BW + "M04_HELMET", layer: "base" },
          ]
        }
      }
    }
  },
  {
    id: "e.bassinian-warder-shoes",
    name: "Bassinian Warder Shoes",
    equipSlot: "boots",
    imagePath: "/images/item-icons/bassinian-warder-shoes.png",
    equipType: "light-boots",
    characterDisplay: {
      perSex: {
        male: {
          all: [
            {
              filename: BW + "M04_FOOTUNDER",
              layer: "base"
            }
          ]
        }
      }
    }
  },
  {
    id: "e.bassinian-warder-sidearm",
    name: "Bassinian Warder Sidearm",
    equipSlot: "main-hand",
    equipType: "sword",
    twoHanded: false,
    characterDisplay: {
      perSex: {
        male: {
          "1h mainhand": [
            {
              filename: BW + "M04_ONEHLWEAPON",
              layer: "under",
            }
          ]
        }
      }
    }
  }
] as const satisfies readonly ItemEquip[];
