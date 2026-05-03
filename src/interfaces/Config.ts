import { EquipSlot } from "../config/equipSlots";
import { ZIndexLayerKey } from "../config/zIndex";

/** One drawable row inside `characterDisplay`; `layer` maps via `zIndexValue`. */
export type CharacterDisplayImageRow = {
  filename: string;
  layer: ZIndexLayerKey;
};

export type Pose =
  | "all"
  | "2h"
  | "2h crossbow"
  | "1h right"
  | "1h left crossbow"
  | "1h right crossbow"
  | "throwing right"
  | "1h left"
  | "throwing left";

export type CharacterSex = "male" | "female";

/**
 * `male` carries exactly one pose bucket (e.g. only `"1h left"` or only `"all"`).
 * Used for `main-hand` / `off-hand` registry items.
 */
export type MaleCharacterDisplaySinglePoseBucket = {
  [K in Pose]: Record<K, CharacterDisplayImageRow[]>;
}[Pose];

/** Boots, pants, helm: only the `all` bucket on `male` (no per-stance arm variants). */
export type CharacterDisplayAllOnly = {
  perSex: {
    male: { all: CharacterDisplayImageRow[] };
  };
};

/** `equipSlot: "chest"`: every `Pose` bucket required on `male`. */
export type CharacterDisplayChest = {
  perSex: {
    male: Record<Pose, CharacterDisplayImageRow[]>;
    female?: Partial<Record<Pose, CharacterDisplayImageRow[]>>;
  };
};

/** `main-hand` / `off-hand`: exactly one male pose bucket. */
export type CharacterDisplayHand = {
  perSex: {
    male: MaleCharacterDisplaySinglePoseBucket;
  };
};

/** Union of all slot-specific registry display shapes. */
export type CharacterDisplay =
  | CharacterDisplayChest
  | CharacterDisplayAllOnly
  | CharacterDisplayHand;

type EquipType =
  | "aerial"
  | "aquatic"
  | "bow"
  | "buckler-shield"
  | "crossbow"
  | "dagger"
  | "darts"
  | "drake"
  | "heavy-boots"
  | "heavy-chest"
  | "heavy-gloves"
  | "heavy-helm"
  | "heavy-pants"
  | "impact"
  | "inorganic"
  | "light-boots"
  | "light-chest"
  | "light-gloves"
  | "light-helm"
  | "light-pants"
  | "mace"
  | "medium-boots"
  | "medium-chest"
  | "medium-gloves"
  | "medium-helm"
  | "medium-pants"
  | "medium-shield"
  | "orb"
  | "polearm"
  | "ring"
  | "rod"
  | "staff"
  | "steed"
  | "sword"
  | "terrestrial"
  | "thrown"
  | "tower-shield"
  | "wand"
  | "whip";

/**
 * One equipment row in `src/data/equipmentSets/*.ts`.
 * `equipSet` for catalog grouping is **not** stored on the row; it is injected from the bundle in `equipmentRegistry.ts`.
 * Omit `characterDisplay` until art is wired (items without it are skipped by `buildEquipmentCatalog`).
 */
export type ItemEquip = {
  id: string;
  name: string;
  equipSlot: EquipSlot;
  equipType?: EquipType | string;
  twoHanded?: boolean;
  imagePath?: string;
  characterDisplay?: CharacterDisplay;
};

export interface ConfigPartType {
  id: number;
  name: string;
}

/** Equipment pipeline resolves numeric `zIndex` from equipment `layer`; base body uses `layer` only (see `baseLayer.ts`). */
export type ConfigImage =
  | {
      filename: string;
      zIndex: number;
      src?: string;
    }
  | {
      filename: string;
      layer: ZIndexLayerKey;
      src?: string;
    };

export interface ConfigPart {
  name: string;
  images: ConfigImage[];
  pose: Pose;
}

export interface ConfigPartEquipment extends ConfigPart {
  equipSlot: EquipSlot;
  /** Optional: e.g. "sword", "bow" (prod may use strings outside this union). */
  equipType?: EquipType | string;
  /** Named set / item-set grouping (from bundle in `equipmentRegistry.ts`). */
  equipSet: string;
  twoHanded?: boolean;
  /** When set, drawable layers are resolved from `equipmentRegistry[equipmentRegistryKey]` using current main/off-hand poses. */
  equipmentRegistryKey?: string;
}

export default interface Config {
  partTypes: ConfigPartType[];
  parts: ConfigPart[];
}
