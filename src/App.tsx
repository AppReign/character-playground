import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthGate from "./components/AuthGate";
import TopNav from "./components/TopNav";
import { AuthProvider } from "./context/AuthContext";
import EquipmentSetDetail from "./pages/equipmentSets/EquipmentSetDetail";
import EquipmentSetsIndex from "./pages/equipmentSets/EquipmentSetsIndex";
import EquipmentSetsLayout from "./pages/equipmentSets/EquipmentSetsLayout";
import EquipmentCharacterUpload from "./pages/EquipmentCharacterUpload";
import Playground from "./pages/Playground";
import layoutClasses from "./styles/Layout.module.scss";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL || ""}>
        <AuthGate>
          <div className={layoutClasses.shell}>
            <TopNav />
            <main className={layoutClasses.main}>
              <Routes>
                <Route path="/" element={<Playground />} />
                <Route path="/upload" element={<EquipmentCharacterUpload />} />
                <Route path="/equipment-sets" element={<EquipmentSetsLayout />}>
                  <Route index element={<EquipmentSetsIndex />} />
                  <Route path=":equipSetId" element={<EquipmentSetDetail />} />
                </Route>
              </Routes>
            </main>
          </div>
        </AuthGate>
      </BrowserRouter>
    </AuthProvider>
  );
};

App.displayName = "App";

export default App;
