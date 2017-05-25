"use strict";

import ImageUtil from "../utils/ImageUtil";

function pages(a) {
  const ret1 = ImageUtil.getImageSize(a);
  const ret2 = ImageUtil.getImageSize(ret1);
  return ret2;
}

export default pages;
