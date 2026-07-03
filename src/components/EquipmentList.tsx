import React from "react";
import classnames from "classnames";

import CdnStatusBadge from "./CdnStatusBadge";
import { ConfigPartEquipment } from "../interfaces/Config";
import { useEquipmentValidation } from "../pages/equipmentSets/equipmentValidationContext";
import {
  equipmentItemCdnTitle,
  isCdnMissing,
  toCdnBadgeStatus
} from "../utils/cdnStatusPresentation";
import classes from "../styles/components/EquipmentList.module.scss";
import { uniqByPartName } from "../utils/uniqByPartName";

interface EquipmentListProps {
  itemList: ConfigPartEquipment[];
  equippedItems: ConfigPartEquipment[];
  equipItem: (item: ConfigPartEquipment) => void;
  unequipItem: (item: ConfigPartEquipment) => void;
}

export const EquipmentList = ({
  itemList,
  equippedItems,
  equipItem,
  unequipItem
}: EquipmentListProps) => {
  const { getItemCdnStatus } = useEquipmentValidation();
  const filteredParts = itemList.reduce<ConfigPartEquipment[]>(
    uniqByPartName,
    []
  );

  return (
    <div className={classes.partList}>
      {filteredParts.map((part, index) => {
        const selected = equippedItems.some((layer) => layer.name === part.name);
        const itemId = part.equipmentRegistryKey;
        const cdnStatus = itemId ? getItemCdnStatus(itemId) : "na";
        const badgeStatus = toCdnBadgeStatus(cdnStatus, { nullForNa: true });
        const missingCdn = isCdnMissing(cdnStatus);
        const checkingCdn = cdnStatus === "pending";
        const statusTitle =
          cdnStatus === "na" ? undefined : equipmentItemCdnTitle(cdnStatus);

        return (
          <div key={part.name} className={classes.partItemWrapper}>
            <div
              className={classnames(classes.partItem, {
                [classes.partItemSelected]: selected,
                [classes.partItemMissing]: missingCdn,
                [classes.partItemChecking]: checkingCdn
              })}
              title={statusTitle}
              onClick={() => {
                if (selected) {
                  unequipItem(part);
                } else {
                  equipItem(part);
                }
              }}
            >
              {index + 1}
              {badgeStatus && (
                <CdnStatusBadge
                  status={badgeStatus}
                  title={statusTitle}
                  className={classes.partItemBadge}
                />
              )}
            </div>
            <div
              className={classnames(classes.partItemLabel, {
                [classes.partItemLabelMissing]: missingCdn
              })}
            >
              {part.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

EquipmentList.displayName = "EquipmentList";
