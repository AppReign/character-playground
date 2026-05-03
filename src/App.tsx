import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TopNav from "./components/TopNav";
import EquipmentSets from "./pages/EquipmentSets";
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
            <Route path="/equipment-sets" element={<EquipmentSets />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

App.displayName = "App";

export default App;
