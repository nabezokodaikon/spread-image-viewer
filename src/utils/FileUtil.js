"use strict";

import fs from "fs";
import path from "path";
import { Seq } from "Immutable";

export default {
  getImageFiles(directoryPath) {
    return Seq(fs.readdirSync(directoryPath))
      .filter(f => fs.statSync(path.join(directoryPath, f)).isFile() && /^(?!\.).*(\.jpg|\.gif|\.bmp|\.png)$/.test(f.toLowerCase()))
      .sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      })
      .toArray(); 
  }
}
