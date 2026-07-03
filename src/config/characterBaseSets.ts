/** Derive character base set list from the bulk API response. */

import type { CharacterBasePartsBundle } from "../types/characterBaseParts";

/** Default skin tone until the playground exposes a color picker. */
export const DEFAULT_CHARACTER_BASE_COLOR = "white";

export type CharacterBaseSetDefinition = {
  id: string;
  gender: "male" | "female";
  color: string;
  label: string;
};

function formatSetLabel(gender: string, color: string): string {
  const genderLabel = gender.charAt(0).toUpperCase() + gender.slice(1);
  const colorLabel = color.charAt(0).toUpperCase() + color.slice(1);
  return `${genderLabel} · ${colorLabel}`;
}

export function characterBaseSetsFromBundle(
  bundle: CharacterBasePartsBundle
): CharacterBaseSetDefinition[] {
  const sets: CharacterBaseSetDefinition[] = [];

  for (const [gender, byColor] of Object.entries(bundle)) {
    for (const [color, variant] of Object.entries(byColor ?? {})) {
      if (gender !== "male" && gender !== "female") continue;
      sets.push({
        id: variant.id ?? `${gender}-${color}`,
        gender,
        color,
        label: formatSetLabel(gender, color)
      });
    }
  }

  return sets.sort((a, b) => a.label.localeCompare(b.label));
}

export function findCharacterBaseSet(
  bundle: CharacterBasePartsBundle,
  setId: string | undefined
): CharacterBaseSetDefinition | undefined {
  if (!setId) return undefined;
  return characterBaseSetsFromBundle(bundle).find((set) => set.id === setId);
}

export function variantFromBundle(
  bundle: CharacterBasePartsBundle,
  setId: string | undefined
) {
  if (!setId) return undefined;
  for (const byColor of Object.values(bundle)) {
    for (const variant of Object.values(byColor ?? {})) {
      if (variant.id === setId) return variant;
    }
  }
  const set = findCharacterBaseSet(bundle, setId);
  if (!set) return undefined;
  return bundle[set.gender]?.[set.color];
}
