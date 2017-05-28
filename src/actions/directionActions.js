"use strict";

import {
  SET_DIRECTION_MODE
} from "../constants/ActionTypes";

export const setDirectionMode = mode => ({
  type: SET_DIRECTION_MODE,
  mode: mode 
});
