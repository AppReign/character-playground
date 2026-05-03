import React from "react";
import { NavLink } from "react-router-dom";

import { equipmentSetBundles } from "../../data/equipmentRegistry";
import { formatEquipSetLabel } from "../../utils/formatEquipSetLabel";
import { useEquipmentValidation } from "./equipmentValidationContext";
import classes from "./EquipmentSetSidebar.module.scss";

const sortedBundles = [...equipmentSetBundles].sort((a, b) =>
  a.equipSet.localeCompare(b.equipSet)
);

const EquipmentSetSidebar = () => {
  const { validationBySet } = useEquipmentValidation();

  return (
    <aside className={classes.aside} aria-label="Equipment sets">
      <div className={classes.asideHeader}>Sets</div>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          {sortedBundles.map((bundle) => {
            const v = validationBySet[bundle.equipSet];
            const hasIssue = v && !v.allItemsDone;

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
                  {hasIssue ? (
                    <span
                      className={classes.badge}
                      data-status="issue"
                      title="Some items missing valid characterDisplay"
                    >
                      !
                    </span>
                  ) : (
                    <span
                      className={classes.badge}
                      data-status="ok"
                      title="All items have valid characterDisplay"
                    >
                      ✓
                    </span>
                  )}
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
