"use strict";

import { nativeImage } from "electron";

export default {
  getImageData: function(filePath) {
    const image = nativeImage.createFromPath(filePath);
    const data = image.toDataURL();
    return {
      data: data, // typeof(data) === "string"
      width: image.width,
      height: image.height
    };
  }
}
