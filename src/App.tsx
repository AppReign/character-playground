import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TopNav from "./components/TopNav";
import EquipmentSetDetail from "./pages/equipmentSets/EquipmentSetDetail";
import EquipmentSetsIndex from "./pages/equipmentSets/EquipmentSetsIndex";
import EquipmentSetsLayout from "./pages/equipmentSets/EquipmentSetsLayout";
import Playground from "./pages/Playground";
import layoutClasses from "./styles/Layout.module.scss";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || ""}>
      <div className={layoutClasses.shell}>
        <TopNav />
        <main className={layoutClasses.main}>
          <Routes>
            <Route path="/" element={<Playground />} />
            <Route path="/equipment-sets" element={<EquipmentSetsLayout />}>
              <Route index element={<EquipmentSetsIndex />} />
              <Route path=":equipSetId" element={<EquipmentSetDetail />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

App.displayName = "App";

export default App;
