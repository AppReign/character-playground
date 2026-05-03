import React from "react";
import { Outlet } from "react-router-dom";

import { EquipmentValidationProvider } from "./equipmentValidationContext";
import EquipmentSetSidebar from "./EquipmentSetSidebar";
import classes from "./EquipmentSetsLayout.module.scss";

const EquipmentSetsLayout = () => {
  return (
    <EquipmentValidationProvider>
      <div className={classes.layout}>
        <EquipmentSetSidebar />
        <section className={classes.main}>
          <Outlet />
        </section>
      </div>
    </EquipmentValidationProvider>
  );
};

EquipmentSetsLayout.displayName = "EquipmentSetsLayout";

export default EquipmentSetsLayout;
