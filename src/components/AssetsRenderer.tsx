import React from "react";

import Asset from "./Asset";
import { ConfigImage, ConfigPart } from "../interfaces/Config";

interface AssetsRendererProps {
  partsArray: ConfigPart[];
}

const AssetsRenderer = ({partsArray}: AssetsRendererProps) => {
  
  debugger;
  return (
    <React.Fragment>
      {partsArray.map((part: ConfigPart) =>
        part.images.map((image: ConfigImage, index: number) => (
          <Asset key={`${part.name}-${index}`} image={image} />
        ))
      )}
    </React.Fragment>
  );
};

AssetsRenderer.displayName = "AssetsRenderer";

export default AssetsRenderer;
