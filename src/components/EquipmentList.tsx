import React from "react";
import classnames from "classnames";

import CdnStatusBadge, { type CdnBadgeStatus } from "./CdnStatusBadge";
import { ConfigPartEquipment } from "../interfaces/Config";
import {
  useEquipmentValidation,
  type CdnRollupStatus
} from "../pages/equipmentSets/equipmentValidationContext";
import classes from "../styles/components/EquipmentList.module.scss";
import { uniqByPartName } from "../utils/uniqByPartName";

interface EquipmentListProps {
  itemList: ConfigPartEquipment[];
  equippedItems: ConfigPartEquipment[];
  equipItem: (item: ConfigPartEquipment) => void;
  unequipItem: (item: ConfigPartEquipment) => void;
}

function badgeStatusForItem(status: CdnRollupStatus): CdnBadgeStatus | null {
  switch (status) {
    case "ok":
      return "ok";
    case "pending":
      return "pending";
    case "issue":
      return "issue";
    case "error":
      return "error";
    case "na":
    default:
      return null;
  }
}

function isMissingOnCdn(status: CdnRollupStatus): boolean {
  return status === "error" || status === "issue";
}

function cdnStatusTitle(status: CdnRollupStatus): string | undefined {
  switch (status) {
    case "ok":
      return "All sprites on CDN";
    case "pending":
      return "Checking CDN sprites…";
    case "error":
      return "Some sprites missing on CDN";
    case "issue":
      return "Missing or invalid characterDisplay";
    default:
      return undefined;
  }
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
        const badgeStatus = badgeStatusForItem(cdnStatus);
        const missingCdn = isMissingOnCdn(cdnStatus);
        const checkingCdn = cdnStatus === "pending";

        return (
          <div key={part.name} className={classes.partItemWrapper}>
            <div
              className={classnames(classes.partItem, {
                [classes.partItemSelected]: selected,
                [classes.partItemMissing]: missingCdn,
                [classes.partItemChecking]: checkingCdn
              })}
              title={cdnStatusTitle(cdnStatus)}
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
                  title={cdnStatusTitle(cdnStatus)}
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
