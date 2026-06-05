import { resolveEquipmentZIndex } from "./resolveEquipmentZIndex";
import { zIndexValue } from "./zIndex";
import { EQUIPMENT } from "./equipmentLayer";

describe("resolveEquipmentZIndex", () => {
  it("resolves chest all base to untucked body", () => {
    expect(
      resolveEquipmentZIndex({
        equipSlot: "chest",
        poseKey: "all",
        layer: "base"
      })
    ).toBe(zIndexValue(EQUIPMENT.CHEST.BODY.UNTUCKED));
  });

  it("resolves chest 2h base to mainhand two-handed overlay", () => {
    expect(
      resolveEquipmentZIndex({
        equipSlot: "chest",
        poseKey: "2h",
        layer: "base"
      })
    ).toBe(zIndexValue(EQUIPMENT.CHEST.MAINHAND.TWO_HANDED));
  });

  it("resolves main-hand crossbow over/under at all pose", () => {
    expect(
      resolveEquipmentZIndex({
        equipSlot: "main-hand",
        poseKey: "all",
        layer: "under",
        equipType: "crossbow"
      })
    ).toBe(zIndexValue(EQUIPMENT.MAINHAND.ONE_HANDED.CROSSBOW.UNDER));
    expect(
      resolveEquipmentZIndex({
        equipSlot: "main-hand",
        poseKey: "all",
        layer: "over",
        equipType: "crossbow"
      })
    ).toBe(zIndexValue(EQUIPMENT.MAINHAND.ONE_HANDED.CROSSBOW.OVER));
  });

  it("resolves main-hand default 1h under at all pose", () => {
    expect(
      resolveEquipmentZIndex({
        equipSlot: "main-hand",
        poseKey: "all",
        layer: "under",
        equipType: "sword"
      })
    ).toBe(zIndexValue(EQUIPMENT.MAINHAND.ONE_HANDED.DEFAULT.UNDER));
  });

  it("resolves off-hand shield under", () => {
    expect(
      resolveEquipmentZIndex({
        equipSlot: "off-hand",
        poseKey: "all",
        layer: "under",
        equipType: "buckler-shield"
      })
    ).toBe(zIndexValue(EQUIPMENT.OFFHAND.ONE_HANDED.SHIELD.UNDER));
  });

  it("resolves boots base only", () => {
    expect(
      resolveEquipmentZIndex({
        equipSlot: "boots",
        poseKey: "all",
        layer: "base"
      })
    ).toBe(zIndexValue(EQUIPMENT.BOOTS.UNTUCKED));
  });

  it("rejects non-base layer on chest", () => {
    expect(() =>
      resolveEquipmentZIndex({
        equipSlot: "chest",
        poseKey: "all",
        layer: "over"
      })
    ).toThrow(/Chest only supports layer=base/);
  });
});
