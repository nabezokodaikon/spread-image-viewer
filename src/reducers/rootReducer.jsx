"use strict";

import { combineReducers } from "redux";
import direction from "./direction";
import visibilityFileName from "./visibilityFileName";
import page from "./page";

const rootReducer = combineReducers({
  direction,
  visibilityFileName,
  page
});

export default rootReducer;
