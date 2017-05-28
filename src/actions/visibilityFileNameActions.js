"use strict";

import {
  SET_VISIBILITY_FILE_NAME
} from "../constants/ActionTypes";

export const setVisibilityFileName = visible => ({
  type: SET_VISIBILITY_FILE_NAME,
  visible: visible
});
