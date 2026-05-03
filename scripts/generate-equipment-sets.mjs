/**
 * Reads `src/data/equipmentSource.json` and writes `src/data/equipmentSets/*.ts`
 * plus `src/data/equipmentRegistry.ts`.
 *
 * Usage: node scripts/generate-equipment-sets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcData = path.join(root, "src", "data");
const jsonPath = path.join(srcData, "equipmentSource.json");
const setsDir = path.join(srcData, "equipmentSets");
const registryPath = path.join(srcData, "equipmentRegistry.ts");

const raw = fs.readFileSync(jsonPath, "utf8");
/** @type {unknown[]} */
const items = JSON.parse(raw);

function kebabToCamel(s) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/** @param {unknown} v */
function tsString(v) {
  return JSON.stringify(v);
}

/**
 * @param {Record<string, unknown>} it
 * @returns {string[]}
 */
function itemLines(it) {
  const lines = [`    {`, `      id: ${tsString(it.id)},`, `      name: ${tsString(it.name)},`, `      equipSlot: ${tsString(it.equipSlot)},`];
  if (typeof it.imagePath === "string") {
    lines.push(`      imagePath: ${tsString(it.imagePath)},`);
  }
  if (it.twoHanded === true) {
    lines.push(`      twoHanded: true,`);
  }
  if (typeof it.equipType === "string") {
    lines.push(`      equipType: ${tsString(it.equipType)},`);
  }
  lines.push(`    },`);
  return lines;
}

if (!fs.existsSync(setsDir)) fs.mkdirSync(setsDir, { recursive: true });

/** @type {Map<string, Record<string, unknown>[]>} */
const byVanity = new Map();
/** @type {Record<string, unknown>[]} */
const nonVanity = [];

for (const it of items) {
  if (typeof it !== "object" || !it) continue;
  const row = /** @type {Record<string, unknown>} */ (it);
  const vanity = row.vanity;
  if (vanity && typeof vanity === "object" && "vanitySet" in vanity) {
    const vs = /** @type {{ vanitySet?: string }} */ (vanity).vanitySet;
    if (typeof vs === "string") {
      if (!byVanity.has(vs)) byVanity.set(vs, []);
      byVanity.get(vs).push(row);
      continue;
    }
  }
  nonVanity.push(row);
}

/** @type {{ camel: string; fileBase: string; exportName: string; equipSet: string }[]} */
const vanityMeta = [];

for (const [vanitySet, rows] of [...byVanity.entries()].sort((a, b) =>
  a[0].localeCompare(b[0])
)) {
  const camel = kebabToCamel(vanitySet);
  const fileBase = camel;
  const exportName = `${camel}Equipment`;
  const equipSet = camel;
  const filePath = path.join(setsDir, `${fileBase}.ts`);
  const body = rows
    .sort((a, b) => String(a.id).localeCompare(String(b.id)))
    .flatMap(itemLines)
    .join("\n");
  const src = `import type { ItemEquip } from "../../interfaces/Config";

/** Vanity set \`${vanitySet}\` — \`equipSet\` for catalog grouping: \`${equipSet}\` (file \`${fileBase}.ts\`). */
export const ${exportName} = [
${body}
] as const satisfies readonly ItemEquip[];
`;
  fs.writeFileSync(filePath, src);
  vanityMeta.push({ camel, fileBase, exportName, equipSet });
}

{
  const body = nonVanity
    .sort((a, b) => String(a.id).localeCompare(String(b.id)))
    .flatMap(itemLines)
    .join("\n");
  const src = `import type { ItemEquip } from "../../interfaces/Config";

/** Items with no \`vanity\` field in the equipment source. \`equipSet\`: \`nonVanity\`. */
export const nonVanityEquipment = [
${body}
] as const satisfies readonly ItemEquip[];
`;
  fs.writeFileSync(path.join(setsDir, "nonVanity.ts"), src);
}

const importLines = [
  ...vanityMeta.map(
    (m) =>
      `import { ${m.exportName} } from "./equipmentSets/${m.fileBase}";`
  ),
  `import { nonVanityEquipment } from "./equipmentSets/nonVanity";`
].sort();

const bundleLines = [
  ...vanityMeta.map(
    (m) => `  { equipSet: "${m.equipSet}", items: ${m.exportName} },`
  ),
  `  { equipSet: "nonVanity", items: nonVanityEquipment },`
];

const registrySrc = `import type { ItemEquip } from "../interfaces/Config";
${importLines.join("\n")}
import { testEquipment } from "./equipmentSets/test";

export type EquipmentSetBundle = {
  equipSet: string;
  items: readonly ItemEquip[];
};

const EQUIPMENT_SET_BUNDLES: readonly EquipmentSetBundle[] = [
${bundleLines.join("\n")}
  { equipSet: "test", items: testEquipment }
];

function mergeEquipmentSets(
  bundles: readonly EquipmentSetBundle[]
): Record<string, ItemEquip> {
  const out: Record<string, ItemEquip> = {};
  for (const { items } of bundles) {
    for (const item of items) {
      if (out[item.id]) {
        throw new Error(\`Duplicate equipment id "\${item.id}"\`);
      }
      out[item.id] = item;
    }
  }
  return out;
}

/** All item definitions keyed by \`id\`. */
export const equipmentRegistry: Record<string, ItemEquip> =
  mergeEquipmentSets(EQUIPMENT_SET_BUNDLES);

/** Ordered bundles for building the drawable catalog (injects \`equipSet\` per bundle). */
export const equipmentSetBundles: readonly EquipmentSetBundle[] =
  EQUIPMENT_SET_BUNDLES;
`;

fs.writeFileSync(registryPath, registrySrc);
console.log(
  `Wrote ${vanityMeta.length} vanity set files, nonVanity.ts, equipmentRegistry.ts`
);
