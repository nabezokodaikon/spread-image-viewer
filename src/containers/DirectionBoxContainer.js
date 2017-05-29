"use strict";

import { connect } from "react-redux";
import {
  LEFT_DIRECTION_MODE,
  RIGHT_DIRECTION_MODE
} from "../constants/DirectionModes";
import { 
  setDirectionMode
} from "../actions/directionActions";
import DirectionBox from "../components/DirectionBox";

const mapStateToProps = (state) => {
  return {
    direction: state.direction
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSetDirectionMode: mode => {
      dispatch(setDirectionMode(mode));
    }
  };
}

const DirectionBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectionBox);

export default DirectionBoxContainer;
