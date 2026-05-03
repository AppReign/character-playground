import React from "react";

import classes from "../styles/EquipmentSets.module.scss";

/**
 * Per-set validation UI — scaffold only; routing and nav are wired.
 */
const EquipmentSets = () => {
  return (
    <div className={classes.page}>
      <h1 className={classes.title}>Equipment sets</h1>
      <p className={classes.lead}>
        Validate drawable rows and poses for each vanity set.
      </p>
    </div>
  );
};

EquipmentSets.displayName = "EquipmentSets";

export default EquipmentSets;
