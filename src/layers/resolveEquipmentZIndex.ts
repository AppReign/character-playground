import type { EquipSlot } from "../config/equipSlots";
import type { Pose } from "../interfaces/Config";
import type { EquipmentHandPose } from "../utils/equipmentPose";
import { EQUIPMENT } from "./equipmentLayer";
import { CharacterStackLayer, normalizeStackLayer } from "./characterStackLayer";
import { WeaponCategory, weaponCategory } from "./weaponCategory";
import { ZIndexLayerKey, zIndexValue } from "./zIndex";

export type ResolveEquipmentZIndexInput = {
  equipSlot: EquipSlot | string;
  poseKey: Pose;
  layer: CharacterStackLayer | string;
  equipType?: string;
  twoHanded?: boolean;
  /** Required for `gloves` at render time. */
  handPose?: EquipmentHandPose;
};

/** Chest: one `base` sprite per pose bucket; pose key selects the overlay slot. */
const CHEST_POSE_BASE_ZINDEX: Partial<Record<Pose, ZIndexLayerKey>> = {
  all: EQUIPMENT.CHEST.BODY.UNTUCKED,
  "1h mainhand": EQUIPMENT.CHEST.OFFHAND.ONE_HANDED,
  "1h offhand": EQUIPMENT.CHEST.MAINHAND.ONE_HANDED,
  "2h": EQUIPMENT.CHEST.MAINHAND.TWO_HANDED,
  "2h crossbow": EQUIPMENT.CHEST.MAINHAND.CROSSBOW_TWO_HANDED,
  "1h mainhand crossbow": EQUIPMENT.CHEST.OFFHAND.CROSSBOW_ONE_HANDED,
  "1h offhand crossbow": EQUIPMENT.CHEST.MAINHAND.CROSSBOW_ONE_HANDED,
  "throwing mainhand": EQUIPMENT.CHEST.OFFHAND.THROWING,
  "throwing offhand": EQUIPMENT.CHEST.MAINHAND.THROWING
};

const MAIN_HAND_ZINDEX: Record<
  WeaponCategory,
  Partial<Record<"over" | "under", ZIndexLayerKey>>
> = {
  "default-1h": {
    under: EQUIPMENT.MAINHAND.ONE_HANDED.DEFAULT.UNDER
  },
  "2h": {
    under: EQUIPMENT.MAINHAND.TWO_HANDED.UNDER,
    over: EQUIPMENT.MAINHAND.TWO_HANDED.OVER
  },
  "crossbow-1h": {
    under: EQUIPMENT.MAINHAND.ONE_HANDED.CROSSBOW.UNDER,
    over: EQUIPMENT.MAINHAND.ONE_HANDED.CROSSBOW.OVER
  },
  "crossbow-2h": {
    under: EQUIPMENT.MAINHAND.TWO_HANDED.UNDER,
    over: EQUIPMENT.MAINHAND.TWO_HANDED.OVER
  },
  shield: {}
};

const OFF_HAND_ZINDEX: Record<
  WeaponCategory,
  Partial<Record<"over" | "under", ZIndexLayerKey>>
> = {
  shield: {
    under: EQUIPMENT.OFFHAND.ONE_HANDED.SHIELD.UNDER
  },
  "crossbow-1h": {
    under: EQUIPMENT.OFFHAND.ONE_HANDED.CROSSBOW.UNDER,
    over: EQUIPMENT.OFFHAND.ONE_HANDED.CROSSBOW.OVER
  },
  "default-1h": {},
  "2h": {},
  "crossbow-2h": {}
};

type GloveHandSide = "mainhand" | "offhand";

const GLOVES_ZINDEX: Record<
  GloveHandSide,
  Partial<Record<Pose, Partial<Record<"over" | "under", ZIndexLayerKey>>>>
> = {
  mainhand: {
    "1h mainhand": {
      under: EQUIPMENT.GLOVES.MAINHAND.DEFAULT.UNDER,
      over: EQUIPMENT.GLOVES.MAINHAND.DEFAULT.OVER
    },
    "2h": {
      under: EQUIPMENT.GLOVES.MAINHAND.TWO_HANDED.UNDER,
      over: EQUIPMENT.GLOVES.MAINHAND.TWO_HANDED.OVER
    },
    "1h mainhand crossbow": {
      under: EQUIPMENT.GLOVES.MAINHAND.CROSSBOW.UNDER,
      over: EQUIPMENT.GLOVES.MAINHAND.CROSSBOW.OVER
    },
    "throwing mainhand": {
      under: EQUIPMENT.GLOVES.MAINHAND.THROWING.UNDER,
      over: EQUIPMENT.GLOVES.MAINHAND.THROWING.OVER
    },
    "2h crossbow": {
      under: EQUIPMENT.GLOVES.MAINHAND.TWO_HANDED_CROSSBOW.UNDER,
      over: EQUIPMENT.GLOVES.MAINHAND.TWO_HANDED_CROSSBOW.OVER
    }
  },
  offhand: {
    "1h offhand": {
      under: EQUIPMENT.GLOVES.OFFHAND.DEFAULT.UNDER,
      over: EQUIPMENT.GLOVES.OFFHAND.DEFAULT.OVER
    },
    "2h": {
      under: EQUIPMENT.GLOVES.OFFHAND.TWO_HANDED.UNDER,
      over: EQUIPMENT.GLOVES.OFFHAND.TWO_HANDED.OVER
    },
    "1h offhand crossbow": {
      under: EQUIPMENT.GLOVES.OFFHAND.CROSSBOW.UNDER,
      over: EQUIPMENT.GLOVES.OFFHAND.CROSSBOW.OVER
    },
    "throwing offhand": {
      under: EQUIPMENT.GLOVES.OFFHAND.THROWING.UNDER,
      over: EQUIPMENT.GLOVES.OFFHAND.THROWING.OVER
    },
    "2h crossbow": {
      under: EQUIPMENT.GLOVES.OFFHAND.TWO_HANDED_CROSSBOW.UNDER,
      over: EQUIPMENT.GLOVES.OFFHAND.TWO_HANDED_CROSSBOW.OVER
    }
  }
};

function resolveChestZIndex(poseKey: Pose, layer: CharacterStackLayer): ZIndexLayerKey {
  if (layer !== "base") {
    throw new Error(`Chest only supports layer=base, got ${layer}`);
  }
  const key = CHEST_POSE_BASE_ZINDEX[poseKey];
  if (!key) {
    throw new Error(`No chest z-index for poseKey=${poseKey}`);
  }
  return key;
}

function resolveSimpleSlotZIndex(
  equipSlot: string,
  layer: CharacterStackLayer
): ZIndexLayerKey {
  if (layer !== "base") {
    throw new Error(`${equipSlot} only supports layer=base, got ${layer}`);
  }
  if (equipSlot === "helm") {
    return EQUIPMENT.HELM;
  }
  if (equipSlot === "pants") {
    return EQUIPMENT.PANTS.UNTUCKED;
  }
  if (equipSlot === "boots") {
    return EQUIPMENT.BOOTS.UNTUCKED;
  }
  throw new Error(`No z-index for equipSlot=${equipSlot}`);
}

function resolveHandWeaponZIndex(
  equipSlot: "main-hand" | "off-hand",
  poseKey: Pose,
  layer: CharacterStackLayer,
  equipType: string | undefined,
  twoHanded?: boolean
): ZIndexLayerKey {
  if (layer !== "over" && layer !== "under") {
    throw new Error(`Hand weapons use over/under layers, got ${layer}`);
  }
  const category = weaponCategory(equipType, poseKey, twoHanded);
  const table = equipSlot === "main-hand" ? MAIN_HAND_ZINDEX : OFF_HAND_ZINDEX;
  const key = table[category][layer];
  if (!key) {
    throw new Error(
      `No ${equipSlot} z-index for category=${category} layer=${layer} poseKey=${poseKey}`
    );
  }
  return key;
}

function resolveGlovesZIndex(
  layer: CharacterStackLayer,
  handPose: EquipmentHandPose
): ZIndexLayerKey[] {
  if (layer !== "over" && layer !== "under") {
    throw new Error(`Gloves use over/under layers, got ${layer}`);
  }
  const out: ZIndexLayerKey[] = [];
  for (const side of ["mainhand", "offhand"] as const) {
    const pose = side === "mainhand" ? handPose.mainHandPose : handPose.offHandPose;
    const key = GLOVES_ZINDEX[side][pose]?.[layer];
    if (key) out.push(key);
  }
  if (!out.length) {
    throw new Error(`No gloves z-index for layer=${layer} handPose=${JSON.stringify(handPose)}`);
  }
  return out;
}

export function resolveEquipmentZIndexKey(input: ResolveEquipmentZIndexInput): ZIndexLayerKey {
  const layer = normalizeStackLayer(String(input.layer));
  if (!layer) {
    throw new Error(`Invalid stack layer: ${input.layer}`);
  }

  const slot = input.equipSlot;

  if (slot === "chest") {
    return resolveChestZIndex(input.poseKey, layer);
  }

  if (slot === "helm" || slot === "pants" || slot === "boots") {
    return resolveSimpleSlotZIndex(slot, layer);
  }

  if (slot === "main-hand") {
    return resolveHandWeaponZIndex(
      "main-hand",
      input.poseKey,
      layer,
      input.equipType,
      input.twoHanded
    );
  }

  if (slot === "off-hand") {
    return resolveHandWeaponZIndex(
      "off-hand",
      input.poseKey,
      layer,
      input.equipType,
      input.twoHanded
    );
  }

  if (slot === "gloves") {
    if (!input.handPose) {
      throw new Error("handPose is required to resolve gloves z-index");
    }
    return resolveGlovesZIndex(layer, input.handPose)[0];
  }

  throw new Error(`Unsupported equipSlot for z-index resolution: ${slot}`);
}

/** One or more z-index keys (gloves may expand to both hands later). */
export function resolveEquipmentZIndexKeys(
  input: ResolveEquipmentZIndexInput
): ZIndexLayerKey[] {
  const layer = normalizeStackLayer(String(input.layer));
  if (!layer) {
    throw new Error(`Invalid stack layer: ${input.layer}`);
  }
  if (input.equipSlot === "gloves" && input.handPose) {
    return resolveGlovesZIndex(layer, input.handPose);
  }
  return [resolveEquipmentZIndexKey(input)];
}

export function resolveEquipmentZIndex(input: ResolveEquipmentZIndexInput): number {
  return zIndexValue(resolveEquipmentZIndexKey(input));
}
