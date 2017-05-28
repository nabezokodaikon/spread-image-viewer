"use strict";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../dest/reducers/rootReducer.js";

const enhancers = 
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(
  rootReducer,
  enhancers
);

render(
  <Provider store={store}>
  </Provider>,
  document.getElementById("root")
);
