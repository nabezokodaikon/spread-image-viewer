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
  },
  getSingleDrawRectangle: function(srcSize, bgRectangle) {
    function adjustByWidth() {
      const w = bgRectangle.width;
      const scale = w / srcSize.width;
      const h = srcSize.height * scale;
      const x = bgRectangle.x;
      const y = (bgRectangle.height - h) / 2 + bgRectangle.y;
      return { x: x, y: y, width: w, height: h };
    }

    function adjustByHeight() {
      const h = bgRectangle.height;
      const scale = h / srcSize.height;
      const w = srcSize.width * scale;
      const x = (bgRectangle.width - w) / 2 + bgRectangle.x;
      const y = bgRectangle.y;
      return { x: x, y: y, width: w, height: h };
    }

    const destByW = adjustByWidth();
    if (destByW.width <= bgRectangle.width &&
        destByW.height <= bgRectangle.height) {
      return destByW;
    } else {
      return adjustByHeight();
    }
  },
  getLeftDrawRectangle: function(srcSize, bgRectangle) {
    function adjustByWidth() {
      const w = bgRectangle.width;
      const scale = w / srcSize.width;
      const h = srcSize.height * scale;
      const x = bgRectangle.x;
      const y = (bgRectangle.height - h) / 2 + bgRectangle.y;
      return { x: x, y: y, width: w, height: h };
    }

    function adjustByHeight() {
      const h = bgRectangle.height;
      const scale = h / srcSize.height;
      const w = srcSize.width * scale;
      const x = bgRectangle.width - w + bgRectangle.x;
      const y = bgRectangle.y;
      return { x: x, y: y, width: w, height: h };
    }

    const destByW = adjustByWidth();
    if (destByW.width <= bgRectangle.width &&
        destByW.height <= bgRectangle.height) {
      return destByW;
    } else {
      return adjustByHeight();
    }
  },
  getRightDrawRectangle: function(srcSize, bgRectangle) {
    function adjustByWidth() {
      const w = bgRectangle.width;
      const scale = w / srcSize.width;
      const h = srcSize.height * scale;
      const x = bgRectangle.x;
      const y = (bgRectangle.height - h) / 2 + bgRectangle.y;
      return { x: x, y: y, width: w, height: h };
    }

    function adjustByHeight() {
      const h = bgRectangle.height;
      const scale = h / srcSize.height;
      const w = srcSize.width * scale;
      const x = bgRectangle.x;
      const y = bgRectangle.y;
      return { x: x, y: y, width: w, height: h };
    }

    const destByW = adjustByWidth();
    if (destByW.width <= bgRectangle.width &&
        destByW.height <= bgRectangle.height) {
      return destByW;
    } else {
      return adjustByHeight();
    }
  },
}
