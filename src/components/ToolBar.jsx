"use strict";

import { remote } from "electron";
import React from "react";
import PropTypes from "prop-types";
import MoveBoxContainer from "../containers/MoveBoxContainer";
import DirectionBoxContainer from "../containers/DirectionBoxContainer";
import FileOpenBoxContainer from "../containers/FileOpenBoxContainer";

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver() {
    this.props.onMouseOver(false);
  }

  render() {
    return (
      <div 
        className="toolBar"
        onMouseOver={ this.handleMouseOver }
      >
        <MoveBoxContainer />
        <DirectionBoxContainer />
        <FileOpenBoxContainer />
      </div>
    );
  }
}

ToolBar.propTypes = {
  onMouseOver: PropTypes.func.isRequired
};

export default ToolBar;
