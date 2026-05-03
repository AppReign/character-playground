import type {
  CharacterDisplayImageRow,
  ItemEquip
} from "../interfaces/Config";

export type ExtractedImageRef = {
  filename: string;
  poseKey: string;
  sex: "male" | "female";
  layer: string;
};

function pushRows(
  out: ExtractedImageRef[],
  bucket: Record<string, CharacterDisplayImageRow[] | undefined> | undefined,
  sex: "male" | "female"
): void {
  if (!bucket) return;
  for (const poseKey of Object.keys(bucket)) {
    const rows = bucket[poseKey];
    if (!rows?.length) continue;
    for (const row of rows) {
      out.push({
        filename: row.filename,
        poseKey,
        sex,
        layer: String(row.layer)
      });
    }
  }
}

/** Every drawable row declared in `characterDisplay` (male + optional female). */
export function extractRequiredCharacterImages(item: ItemEquip): ExtractedImageRef[] {
  if (!item.characterDisplay) return [];
  const out: ExtractedImageRef[] = [];
  const male = item.characterDisplay.perSex.male as
    | Record<string, CharacterDisplayImageRow[]>
    | undefined;
  pushRows(out, male, "male");
  if ("female" in item.characterDisplay.perSex) {
    const female = item.characterDisplay.perSex.female as
      | Record<string, CharacterDisplayImageRow[]>
      | undefined;
    pushRows(out, female, "female");
  }
  return out;
}

export function uniqueFilenames(refs: ExtractedImageRef[]): string[] {
  return Array.from(new Set(refs.map((r) => r.filename)));
}
