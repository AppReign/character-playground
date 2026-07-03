import { resolveEquipmentImagesForHandPose } from "./equipmentDisplay";
import { derivePoseFromEquipment } from "../utils/equipmentPose";
import { zIndexValue } from "../layers/zIndex";
import { EQUIPMENT } from "../layers/equipmentLayer";
import { BODY } from "../layers/baseLayer";
import type { ConfigPartEquipment, ItemEquip } from "../interfaces/Config";

function mockChestItem(): ItemEquip {
  return {
    id: "e.test-chest",
    name: "Test Chest",
    equipSlot: "chest",
    equipType: "medium-chest",
    characterDisplay: {
      perSex: {
        male: {
          all: [{ filename: "test-chest-all-base-male.png", layer: "base" }],
          "1h mainhand": [
            { filename: "test-chest-idle-mainhand-overlay-male.png", layer: "base" }
          ],
          "1h offhand": [
            { filename: "test-chest-idle-offhand-overlay-male.png", layer: "base" }
          ],
          "throwing mainhand": [
            { filename: "test-chest-throw-mh-overlay-male.png", layer: "base" }
          ],
          "throwing offhand": [
            { filename: "test-chest-throw-oh-overlay-male.png", layer: "base" }
          ]
        }
      }
    }
  };
}

function mainHandDarts(): ConfigPartEquipment {
  return {
    name: "Test Darts",
    equipSlot: "main-hand",
    equipType: "darts",
    pose: "all",
    equipSet: "test",
    images: []
  };
}

function offHandDarts(): ConfigPartEquipment {
  return {
    name: "Test Darts",
    equipSlot: "off-hand",
    equipType: "darts",
    pose: "all",
    equipSet: "test",
    images: []
  };
}

describe("resolveEquipmentImagesForHandPose (chest)", () => {
  it("loads throwing mainhand overlay from the matching characterDisplay bucket", () => {
    const equipped = [mainHandDarts()];
    const handPose = derivePoseFromEquipment(equipped);
    const images = resolveEquipmentImagesForHandPose(
      mockChestItem(),
      handPose,
      "male",
      equipped
    );

    expect(images.map((img) => img.filename)).toEqual([
      "test-chest-all-base-male.png",
      "test-chest-throw-mh-overlay-male.png",
      "test-chest-idle-offhand-overlay-male.png"
    ]);
    const byFilename = Object.fromEntries(
      images
        .filter((img): img is { filename: string; zIndex: number } => "zIndex" in img)
        .map((img) => [img.filename, img.zIndex])
    );
    expect(byFilename["test-chest-throw-mh-overlay-male.png"]).toBe(
      zIndexValue(EQUIPMENT.CHEST.MAINHAND.THROWING)
    );
  });

  it("loads throwing offhand overlay from the matching characterDisplay bucket", () => {
    const equipped = [offHandDarts()];
    const handPose = derivePoseFromEquipment(equipped);
    expect(handPose).toEqual({
      mainHandPose: "1h mainhand",
      offHandPose: "throwing offhand"
    });

    const images = resolveEquipmentImagesForHandPose(
      mockChestItem(),
      handPose,
      "male",
      equipped
    );

    expect(images.map((img) => img.filename)).toEqual([
      "test-chest-all-base-male.png",
      "test-chest-idle-mainhand-overlay-male.png",
      "test-chest-throw-oh-overlay-male.png"
    ]);
    const byFilename = Object.fromEntries(
      images
        .filter((img): img is { filename: string; zIndex: number } => "zIndex" in img)
        .map((img) => [img.filename, img.zIndex])
    );
    expect(byFilename["test-chest-throw-oh-overlay-male.png"]).toBe(
      zIndexValue(EQUIPMENT.CHEST.OFFHAND.THROWING)
    );
    expect(byFilename["test-chest-throw-oh-overlay-male.png"]).toBeGreaterThan(
      zIndexValue(EQUIPMENT.CHEST.BODY.UNTUCKED)
    );
  });

  it("loads both idle overlays when no hand weapons are equipped", () => {
    const handPose = derivePoseFromEquipment([]);
    const images = resolveEquipmentImagesForHandPose(
      mockChestItem(),
      handPose,
      "male",
      []
    );

    expect(images.map((img) => img.filename)).toEqual([
      "test-chest-all-base-male.png",
      "test-chest-idle-mainhand-overlay-male.png",
      "test-chest-idle-offhand-overlay-male.png"
    ]);
    const byFilename = Object.fromEntries(
      images
        .filter((img): img is { filename: string; zIndex: number } => "zIndex" in img)
        .map((img) => [img.filename, img.zIndex])
    );
    expect(byFilename["test-chest-idle-offhand-overlay-male.png"]).toBe(
      zIndexValue(EQUIPMENT.CHEST.OFFHAND.ONE_HANDED)
    );
    expect(byFilename["test-chest-idle-offhand-overlay-male.png"]).toBeGreaterThan(
      zIndexValue(EQUIPMENT.CHEST.BODY.UNTUCKED)
    );
    expect(byFilename["test-chest-idle-offhand-overlay-male.png"]).toBeGreaterThanOrEqual(
      zIndexValue(BODY.OFFHAND.ONE_HANDED.UNDER)
    );
  });
});
