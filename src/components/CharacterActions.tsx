import React from "react";
import classes from "../styles/components/CharacterActions.module.scss";

interface CharacterActionsProps {
  randomize: () => void;
  save: () => void;
  share: () => void;
  refresh: () => void;
}

export const CharacterActions = ({randomize, save, share, refresh}: CharacterActionsProps) => {
  
  return (
    <div className={classes.actions}>
      <button
        type="button"
        className={classes.action}
        onClick={refresh}
      >
        refresh
      </button>
      <button
        type="button"
        className={classes.action}
        onClick={save}
      >
        save
      </button>
      <button
        type="button"
        className={classes.action}
        onClick={randomize}
      >
        random
      </button>
      <button
        type="button"
        className={classes.action}
        onClick={share}
      >
        share
      </button>
    </div>
  );
};

CharacterActions.displayName = "CharacterActions";
