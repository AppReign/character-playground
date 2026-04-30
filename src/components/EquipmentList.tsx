import React from "react";
import { ConfigPartEquipment } from "../interfaces/Config";
import classes from "../styles/components/EquipmentList.module.scss";
import { uniqByPartName } from "../utils/uniqByPartName";

interface EquipmentListProps {
  itemList: ConfigPartEquipment[];
  equippedItems: ConfigPartEquipment[];
  equipItem: (item: ConfigPartEquipment) => void;
  unequipItem: (item: ConfigPartEquipment) => void;
}

export const EquipmentList = ({itemList, equippedItems, equipItem, unequipItem}: EquipmentListProps) => {
  const filteredParts = itemList.reduce<ConfigPartEquipment[]>(
    uniqByPartName,
    []
  );

  return (
      <div className={classes.partList}>
        {filteredParts.map((part, index) => (
          <div key={part.name} className={classes.partItemWrapper}>
            <div
              className={
                equippedItems.some(layer => layer.name === part.name)
                  ? classes.partItemSelected
                  : classes.partItem
              }
              onClick={() => {
                if (equippedItems.some(layer => layer.name === part.name)) {
                  unequipItem(part);
                } else {
                  equipItem(part);
                }
              }}
            >
              {index + 1}
            </div>
            <div className={classes.partItemLabel}>{part.name}</div>
          </div>
        ))}
      </div>
  );
};

EquipmentList.displayName = "EquipmentList";
