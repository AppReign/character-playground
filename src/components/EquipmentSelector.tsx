import React from "react";
import { EquipmentList } from "../components/EquipmentList";
import { ConfigPartEquipment } from "../interfaces/Config";
import classes from "../styles/components/EquipmentSelector.module.scss";

interface EquipmentSelectorProps {
  equipItem: (item: ConfigPartEquipment) => void;
  unequipItem: (item: ConfigPartEquipment) => void;
  equippedItems: ConfigPartEquipment[];
  itemList: ConfigPartEquipment[];
  title?: string;
}

const EquipmentSelector = ({itemList, title, equipItem, unequipItem, equippedItems}: EquipmentSelectorProps) => {

  return (
    <div className={classes.EquipmentSelector}>
      {title && (
        <h2 className={classes.EquipmentSelectorTitle}>{title}</h2>
      )}
      <EquipmentList
        itemList={itemList}
        equipItem={equipItem}
        unequipItem={unequipItem}
        equippedItems={equippedItems}
      />
    </div>
  );
};

EquipmentSelector.displayName = "EquipmentSelector";

export default EquipmentSelector;
