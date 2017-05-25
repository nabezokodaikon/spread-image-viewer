"use strict";

import fs from "fs";
import Canvas from "canvas";

export function getImageSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  const image = new Canvas.Image();
  image.src = buffer;
  return {
    width: image.width,
    height: image.height
  };
}
