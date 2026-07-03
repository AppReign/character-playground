import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";

import CdnCheckProgress from "../../components/CdnCheckProgress";
import CdnStatusBadge from "../../components/CdnStatusBadge";
import { formatEquipSetLabel } from "../../utils/formatEquipSetLabel";
import {
  equipmentSetCdnTitle,
  toCdnBadgeStatus
} from "../../utils/cdnStatusPresentation";
import { useEquipmentValidation } from "./equipmentValidationContext";
import classes from "./EquipmentSetSidebar.module.scss";

const EquipmentSetSidebar = () => {
  const {
    validationBySet,
    bundles,
    getSetCdnStatus,
    cdnChecking,
    cdnCheckProgress
  } = useEquipmentValidation();

  const sortedBundles = useMemo(
    () => [...bundles].sort((a, b) => a.equipSet.localeCompare(b.equipSet)),
    [bundles]
  );

  const showProgress =
    cdnChecking || cdnCheckProgress.checked < cdnCheckProgress.total;

  return (
    <aside className={classes.aside} aria-label="Equipment sets">
      <div className={classes.asideHeader}>Sets</div>
      {showProgress && (
        <CdnCheckProgress
          checked={cdnCheckProgress.checked}
          total={cdnCheckProgress.total}
        />
      )}
      <nav className={classes.nav}>
        <ul className={classes.list}>
          {sortedBundles.map((bundle) => {
            const v = validationBySet[bundle.equipSet];
            if (!v) return null;

            const setStatus = getSetCdnStatus(bundle.equipSet);

            return (
              <li key={bundle.equipSet}>
                <NavLink
                  to={`/equipment-sets/${bundle.equipSet}`}
                  className={({ isActive }) =>
                    [classes.link, isActive ? classes.linkActive : ""].join(
                      " "
                    )
                  }
                >
                  <span className={classes.linkLabel}>
                    {formatEquipSetLabel(bundle.equipSet)}
                  </span>
                  <CdnStatusBadge
                    status={toCdnBadgeStatus(setStatus) ?? "error"}
                    title={equipmentSetCdnTitle(setStatus)}
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

EquipmentSetSidebar.displayName = "EquipmentSetSidebar";

export default EquipmentSetSidebar;
