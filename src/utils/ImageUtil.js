"use strict";

import { nativeImage } from "electron";

export default {
  getImageData: function(filePath) {
    const image = nativeImage.createFromPath(filePath);
    const data = image.toDataURL();
    const size = image.getSize();
    return {
      data: data, // typeof(data) === "string"
      width: size.width,
      height: size.height
    };
  }
}
