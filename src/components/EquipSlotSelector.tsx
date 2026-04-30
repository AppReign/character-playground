import React from "react";
import equipSlots, { EquipSlot } from "../config/equipSlots";

type Props = {
  selectedEquipmentSlot: EquipSlot;
  setSelectedEquipmentSlot: (equipmentSlot: EquipSlot) => void;
};

const EquipSlotSelector = ({selectedEquipmentSlot, setSelectedEquipmentSlot}: Props) => {

  const equipmentSlots = equipSlots.map((equipmentSlot) => (
    <button
      key={equipmentSlot}
      type="button"
      onClick={() => setSelectedEquipmentSlot(equipmentSlot)}
      style={{
        backgroundColor:
          equipmentSlot === selectedEquipmentSlot ? "green" : undefined
      }}
    >
      {equipmentSlot}
    </button>
  ));

  return <div>{equipmentSlots}</div>;
};

EquipSlotSelector.displayName = "EquipSlotSelector";

export default EquipSlotSelector;
