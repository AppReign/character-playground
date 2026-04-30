import React from "react";

import classes from "../styles/components/Asset.module.scss";
import { ConfigImage } from "../interfaces/Config";
import { zIndexValue } from "../config/zIndex";
import { getImageSrc } from "../utils/imageSrcResolver";

function resolveZIndex(image: ConfigImage): number {
  return "layer" in image ? zIndexValue(image.layer) : image.zIndex;
}

interface AssetProps {
  image: ConfigImage;
}

const Asset = ({image}: AssetProps) => {
  const src = getImageSrc(image);
  
  return (
    <div
      className={classes.Asset}
      style={{ zIndex: resolveZIndex(image) }}
      data-part={image.filename}
    >
      <img
        className={"characterLayer"}
        src={src}
        alt={image.filename}
      />
    </div>
  );
};

Asset.displayName = "Asset";

export default Asset;
