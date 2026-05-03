import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

import classes from "./TopNav.module.scss";

const TopNav = () => {
  return (
    <header className={classes.header} role="banner">
      <nav className={classes.nav} aria-label="Main">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            classnames(classes.link, isActive && classes.linkActive)
          }
        >
          Playground
        </NavLink>
        <NavLink
          to="/equipment-sets"
          className={({ isActive }) =>
            classnames(classes.link, isActive && classes.linkActive)
          }
        >
          Equipment sets
        </NavLink>
      </nav>
    </header>
  );
};

TopNav.displayName = "TopNav";

export default TopNav;
