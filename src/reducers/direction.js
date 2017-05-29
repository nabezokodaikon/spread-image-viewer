"use strict";

import {
  SET_DIRECTION_MODE
} from "../constants/ActionTypes";
import {
  LEFT_DIRECTION_MODE,
  RIGHT_DIRECTION_MODE
} from "../constants/DirectionModes";

function direction(state = RIGHT_DIRECTION_MODE, action) {
  switch (action.type) {
    case SET_DIRECTION_MODE:
      return action.mode;
    default:
      return state;
  }
}

export default direction;
