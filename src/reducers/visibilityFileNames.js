"use strict";

import {
  SET_VISIBILITY_FILE_NAMES
} from "../constants/ActionTypes";

function visibilityFileNames(state = false, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILE_NAMES:
      return action.visible;
    default:
      throw new Error(`Action type "${action.type}" is not define.`);
  }
}

export default visibilityFileNames;
