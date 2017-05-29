"use strict";

import React from "react";
import PropTypes from "prop-types";
import {
  LEFT_DIRECTION_MODE,
  RIGHT_DIRECTION_MODE
} from "../constants/DirectionModes";

class DirectionBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleToLeftButtonClick = this.handleToLeftButtonClick.bind(this);
    this.handleToRightButtonClick = this.handleToRightButtonClick.bind(this);
  }

  isLeftDirection() {
    if (this.props.direction == LEFT_DIRECTION_MODE) {
      return true;
    } else {
      return false;
    }
  }

  handleToLeftButtonClick() {
    this.props.onSetDirectionMode(LEFT_DIRECTION_MODE);
  };

  handleToRightButtonClick() {
    this.props.onSetDirectionMode(RIGHT_DIRECTION_MODE);
  };

  render() {
    return (
      <div>
        <label>
          <input 
            className="toolRadio"
            type="radio" 
            checked={ this.isLeftDirection() }
            onClick={ this.handleToLeftButtonClick }
            onChange={ () => {} }
          />
          To left
        </label>
        <label>
          <input 
            className="toolRadio"
            type="radio" 
            checked={ !this.isLeftDirection() } 
            onClick={ this.handleToRightButtonClick }
            onChange={ () => {} }
          />
          To right
        </label>
      </div>
    );
  }
}

DirectionBox.propTypes = {
  direction: PropTypes.string.isRequired,
  onSetDirectionMode: PropTypes.func.isRequired
};

export default DirectionBox;
