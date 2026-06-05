import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import classes from "./TopNav.module.scss";

const TopNav = () => {
  const { profile, canUploadCharacterAssets, logout } = useAuth();

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
        {canUploadCharacterAssets && (
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              classnames(classes.link, isActive && classes.linkActive)
            }
          >
            Upload
          </NavLink>
        )}
      </nav>
      {profile && (
        <div className={classes.session}>
          <span className={classes.user} title={profile.id}>
            {profile.characterName}
          </span>
          <button type="button" className={classes.signOut} onClick={() => logout()}>
            Sign out
          </button>
        </div>
      )}
    </header>
  );
};

TopNav.displayName = "TopNav";

export default TopNav;
