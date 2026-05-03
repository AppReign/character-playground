import { ConfigPart } from "../interfaces/Config";
import { BODY } from "./baseLayer";
import {
  deriveBaseArmBundlePoses,
  type EquipmentHandPose
} from "../utils/equipmentPose";

export const getBaseCharacterAssets = (pose: EquipmentHandPose) => {
  const baseAssets = [...partsBaseBody];
  const [armPoseA, armPoseB] = deriveBaseArmBundlePoses(pose);
  baseAssets.push(...partsBaseArms.filter((part) => part.pose === armPoseA));
  baseAssets.push(...partsBaseArms.filter((part) => part.pose === armPoseB));
  return baseAssets;
};

/**
 * Base character parts: face/body, hair, bare chest, base pants/foot.
 * No arms.
 */
export const partsBaseBody: ConfigPart[] = [
  {
    name: "MALE",
    pose: 'all',
    images: [
      {
        filename: "M01_HEAD",
        layer: BODY.HEAD.BASE
      }
    ]
  },
  {
    name: "BASE HAIR MALE 01",
    pose: 'all',
    images: [
      {
        filename: "M01_HAIR",
        layer: BODY.HAIR.OVER
      }
    ]
  },
  {
    name: "CHEST MALE 01",
    pose: 'all',
    images: [
      {
        filename: "M01_CHESTUNDER",
        layer: BODY.CHEST.BASE
      }
    ]
  },
  {
    name: "BASE PANTS MALE 01",
    pose: 'all',
    images: [
      {
        filename: "M01_PANTSOVER",
        layer: BODY.UNDERWEAR.BOTTOM
      }
    ]
  },
  {
    name: "BASE FOOT MALE 01",
    pose: 'all',
    images: [
      {
        filename: "M01_FOOTUNDER",
        layer: BODY.FOOT.BASE
      }
    ]
  }
];


/**
 * Base character arm poses only (M01 set).
 */
export const partsBaseArms: ConfigPart[] = [
  {
    name: "ARMS 1H LEFT MALE 01",
    pose: '1h left',
    images: [
      {
        filename: "M01_ONEHLARM",
        layer: BODY.ARMS.ONE_HANDED.LEFT.ARM
      },
      {
        filename: "M01_ONEHLFINGERS",
        layer: BODY.ARMS.ONE_HANDED.LEFT.FINGERS
      }
    ]
  },
  {
    name: "ARMS 1H RIGHT MALE 01",
    pose: '1h right',
    images: [
      {
        filename: "M01_ONEHRARM",
        layer: BODY.ARMS.ONE_HANDED.RIGHT.ARM
      },
      {
        filename: "M01_ONEHRFINGERS",
        layer: BODY.ARMS.ONE_HANDED.RIGHT.FINGERS
      }
    ]
  },
  {
    name: "TWO HANDED ARMS MALE 01",
    pose: '2h',
    images: [
      {
        filename: "M01_TWOHRARM",
        layer: BODY.ARMS.TWO_HANDED.DEFAULT.RIGHT_ARM
      },
      {
        filename: "M01_TWOHLFINGERS",
        layer: BODY.ARMS.TWO_HANDED.DEFAULT.LEFT_FINGERS
      },
      {
        filename: "M01_TWOHLARM",
        layer: BODY.ARMS.TWO_HANDED.DEFAULT.LEFT_ARM
      },
      {
        filename: "M01_TWOHRFINGERS",
        layer: BODY.ARMS.TWO_HANDED.DEFAULT.RIGHT_FINGERS
      }
    ]
  },
  {
    name: "CROSSBOW ARMS 2H",
    pose: '2h crossbow',
    images: [
      {
        filename: "M01_TWOHCBRARM",
        layer: BODY.ARMS.TWO_HANDED.CROSSBOW.RIGHT_ARM
      },
      {
        filename: "M01_TWOHCBLFINGERS",
        layer: BODY.ARMS.TWO_HANDED.CROSSBOW.LEFT_FINGERS
      },
      {
        filename: "M01_TWOHCBLARM",
        layer: BODY.ARMS.TWO_HANDED.CROSSBOW.LEFT_ARM
      }
    ]
  },
  {
    name: "1H CROSSBOW LEFT ARM",
    pose: '1h left crossbow',
    images: [
      {
        filename: "M01_ONEHCBLARM",
        layer: BODY.ARMS.ONE_HANDED.CROSSBOW.LEFT
      }
    ]
  },
  {
    name: "1H CROSSBOW RIGHT ARM",
    pose: '1h right crossbow',
    images: [
      {
        filename: "M01_ONEHCBRARM",
        layer: BODY.ARMS.ONE_HANDED.CROSSBOW.RIGHT
      }
    ]
  },
  {
    name: "ARMS 1H LEFT THROWING MALE 01",
    pose: 'throwing left',
    images: [
      {
        filename: "M01_ARMLTHROWING",
        layer: BODY.ARMS.THROWING.LEFT
      }
    ]
  },
  {
    name: "ARMS 1H RIGHT THROWING MALE 01",
    pose: 'throwing right',
    images: [
      {
        filename: "M01_ARMRTHROWING",
        layer: BODY.ARMS.THROWING.RIGHT
      }
    ]
  }
];

/**
 * Base character parts: body + arms (same as before, for backward compatibility).
 */
const partsBase: ConfigPart[] = [...partsBaseBody, ...partsBaseArms];

export default partsBase;
