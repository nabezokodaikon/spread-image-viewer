"use strict";

import React from "react";
import PropTypes from "prop-types";
import {
  LEFT_DIRECTION_MODE,
  RIGHT_DIRECTION_MODE
} from "../constants/DirectionModes";

class MoveBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleDoubleLeftButtonClick = this.handleDoubleLeftButtonClick.bind(this);
    this.handleSingleLeftButtonClick = this.handleSingleLeftButtonClick.bind(this);
    this.handleSingleRightButtonClick = this.handleSingleRightButtonClick.bind(this);
    this.handleDoubleRightButtonClick = this.handleDoubleRightButtonClick.bind(this);
  }

  isLeftDirection() {
    if (this.props.direction == LEFT_DIRECTION_MODE) {
      return true;
    } else {
      return false;
    }
  }

  handleDoubleLeftButtonClick() {
    if (this.isLeftDirection()) {
      this.props.onDoubleNextPage();
    } else {
      this.props.onDoublePreviewPage();
    }
  };

  handleSingleLeftButtonClick() {
    if (this.isLeftDirection()) {
      this.props.onSingleNextPage();
    } else {
      this.props.onSinglePreviewPage();
    }
  };

  handleSingleRightButtonClick() {
    if (this.isLeftDirection()) {
      this.props.onSinglePreviewPage();
    } else {
      this.props.onSingleNextPage();
    }
  };

  handleDoubleRightButtonClick() {
    if (this.isLeftDirection()) {
      this.props.onDoublePreviewPage();
    } else {
      this.props.onDoubleNextPage();
    }
  };

  render() {
    return (
      <div>
        <button
          className="toolButton"
          onClick={this.handleDoubleLeftButtonClick}>
          {"<<"}
        </button>
        <button
          className="toolButton"
          onClick={this.handleSingleLeftButtonClick}>
          {"<"}
        </button>
        <button
          className="toolButton"
          onClick={this.handleSingleRightButtonClick}>
          {">"}
        </button>
        <button
          className="toolButton"
          onClick={this.handleDoubleRightButtonClick}>
          {">>"}
        </button>
      </div>
    );
  }
}

MoveBox.propTypes = {
  direction: PropTypes.string.isRequired,
  onSingleNextPage: PropTypes.func.isRequired,
  onSinglePreviewPage: PropTypes.func.isRequired,
  onDoubleNextPage: PropTypes.func.isRequired,
  onDoublePreviewPage: PropTypes.func.isRequired
};

export default MoveBox;
