import React from "react";
import { Outlet } from "react-router-dom";

import { useCharacterBaseSets } from "../../context/CharacterBaseSetsContext";
import CharacterSetSidebar from "./CharacterSetSidebar";
import { CharacterBaseSetValidationProvider } from "./characterBaseSetValidationContext";
import classes from "../equipmentSets/EquipmentSetsLayout.module.scss";

const CharacterSetsLayout = () => {
  const { ready, loading, error } = useCharacterBaseSets();

  return (
    <CharacterBaseSetValidationProvider>
      <div className={classes.layout}>
        <CharacterSetSidebar />
        <section className={classes.main}>
          {!ready || loading ? (
            <p className={classes.loading}>Loading character base sets from API…</p>
          ) : error ? (
            <p className={classes.loading}>Character base sets unavailable: {error}</p>
          ) : (
            <Outlet />
          )}
        </section>
      </div>
    </CharacterBaseSetValidationProvider>
  );
};

CharacterSetsLayout.displayName = "CharacterSetsLayout";

export default CharacterSetsLayout;
