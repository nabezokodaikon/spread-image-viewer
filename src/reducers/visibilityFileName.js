"use strict";

import {
  SET_VISIBILITY_FILE_NAME
} from "../constants/ActionTypes";

function visibilityFileName(state = false, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILE_NAME:
      return action.visible;
    default:
      throw new Error(`Action type "${action.type}" is not define.`);
  }
}

export default visibilityFileName;
