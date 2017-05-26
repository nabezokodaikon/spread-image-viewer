"use strict";

import fs from "fs";
import Canvas from "canvas";

export default {
  getImageData: function(filePath) {
    const buffer = fs.readFileSync(filePath);
    const image = new Canvas.Image();
    image.src = buffer;
    return {
      data: buffer, // typeof(buffer) === "object"
      width: image.width,
      height: image.height
    };
  }
}
