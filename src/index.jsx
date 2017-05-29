"use strict";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer.js";
import MoveBoxContainer from "./containers/MoveBoxContainer";
import DirectionBoxContainer from "./containers/DirectionBoxContainer";
import FileOpenBoxContainer from "./containers/FileOpenBoxContainer";

const enhancers = 
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(
  rootReducer,
  enhancers
);

render(
  <Provider store={store}>
    <div>
      <MoveBoxContainer />
      <DirectionBoxContainer />
      <FileOpenBoxContainer />
    </div>
  </Provider>,
  document.getElementById("root")
);
