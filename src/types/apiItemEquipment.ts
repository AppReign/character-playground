import type { ApiCharacterDisplay } from "../services/creatorEquipmentApi";

export type ApiItemVanity = {
  /** Present when API uses {@code @JsonProperty("isVanity")} (preferred). */
  isVanity?: boolean;
  /** Legacy Jackson name for {@code isVanity()} before {@code @JsonProperty}. */
  vanity?: boolean;
  vanitySet?: string;
};

export function isVanityItem(vanity: ApiItemVanity | undefined): boolean {
  if (!vanity) return false;
  return vanity.isVanity === true || vanity.vanity === true;
}

/** Equipment row from `POST /api/data/items/batch` (hydrated `characterDisplay`). */
export type ApiItemEquipment = {
  id: string;
  name: string;
  equipSlot: string;
  equipType?: string;
  twoHanded?: boolean;
  imagePath?: string;
  itemSetIds?: string[];
  vanity?: ApiItemVanity;
  characterDisplay?: ApiCharacterDisplay | null;
};
