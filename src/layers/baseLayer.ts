/**
 * Designer-friendly names for non-equipment (“base body”) layers.
 *
 * Leaf string values are keys in `zIndex` (valid `ZIndexLayerKey`). They use a
 * `BODY_*` prefix so they never collide with `EQUIPMENT` leaf strings in
 * `equipmentLayer.ts`.
 *
 * This file is intentionally separate from `equipmentLayer.ts` so base-body asset
 * authors can work without touching equipment layering.
 */
export const BODY = {
  HEAD: {
    BASE: "BODY_HEAD_BASE",
  },
  HAIR: {
    OVER: "BODY_HAIR_OVER",
    UNDER: "BODY_HAIR_UNDER"
  },
  BODY: {
    BASE: "BODY_BODY_BASE"
  },
  UNDERWEAR: {
    TOP: "BODY_UNDERWEAR_TOP",
    BOTTOM: "BODY_UNDERWEAR_BOTTOM"
  },
  MAINHAND: {
    ONE_HANDED: {
      UNDER: "BODY_ONEHLARM",
      OVER: "BODY_ONEHLFINGERS"
    },
    ONE_HANDED_CROSSBOW: {
      UNDER: "BODY_ONEHCBLARM"
    },
    ONE_HANDED_THROWING: {
      UNDER: "BODY_ARMLTHROWING"
    },
    TWO_HANDED: {
      UNDER: "BODY_TWOHLARM",
      OVER: "BODY_TWOHLFINGERS"
    },
    TWO_HANDED_CROSSBOW: {
      UNDER: "BODY_TWOHCBLARM",
      OVER: "BODY_TWOHCBLFINGERS"
    }
  },
  OFFHAND: {
    ONE_HANDED: {
      UNDER: "BODY_ONEHRARM",
      OVER: "BODY_ONEHRFINGERS"
    },
    ONE_HANDED_CROSSBOW: {
      UNDER: "BODY_ONEHCBRARM"
    },
    ONE_HANDED_THROWING: {
      UNDER: "BODY_ARMRTHROWING"
    },
    TWO_HANDED: {
      UNDER: "BODY_TWOHRARM",
      OVER: "BODY_TWOHRFINGERS"
    },
    TWO_HANDED_CROSSBOW: {
      UNDER: "BODY_TWOHCBRARM"
    }
  }
} as const;
