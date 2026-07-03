import React from "react";
import { Outlet } from "react-router-dom";

import { useCreatorEquipment } from "../../context/CreatorEquipmentContext";
import EquipmentSetSidebar from "./EquipmentSetSidebar";
import { EquipmentValidationProvider } from "./equipmentValidationContext";
import classes from "./EquipmentSetsLayout.module.scss";

const EquipmentSetsLayout = () => {
  const { ready, loading, error } = useCreatorEquipment();

  return (
    <EquipmentValidationProvider>
      <div className={classes.layout}>
        <EquipmentSetSidebar />
        <section className={classes.main}>
          {!ready || loading ? (
            <p className={classes.loading}>Loading equipment from API…</p>
          ) : error ? (
            <p className={classes.loading}>Equipment unavailable: {error}</p>
          ) : (
            <Outlet />
          )}
        </section>
      </div>
    </EquipmentValidationProvider>
  );
};

EquipmentSetsLayout.displayName = "EquipmentSetsLayout";

export default EquipmentSetsLayout;
