import React from "react";
import classnames from "classnames";
import { NavLink, Outlet } from "react-router-dom";

import classes from "./UploadLayout.module.scss";

const UploadLayout = () => {
  return (
    <div>
      <nav className={classes.tabs} aria-label="Upload type">
        <NavLink
          to="/upload/base-parts"
          className={({ isActive }) =>
            classnames(classes.tab, isActive && classes.tabActive)
          }
        >
          Base body
        </NavLink>
        <NavLink
          to="/upload/equipment"
          className={({ isActive }) =>
            classnames(classes.tab, isActive && classes.tabActive)
          }
        >
          Equipment
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

UploadLayout.displayName = "UploadLayout";

export default UploadLayout;
