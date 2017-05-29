"use strict";

import { connect } from "react-redux";
import { 
  singleNextPage,
  singlePreviewPage,
  doubleNextPage,
  doublePreviewPage
} from "../actions/pageActions";
import MoveBox from "../components/MoveBox";

const mapStateToProps = (state) => {
  return {
    direction: state.direction
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSingleNextPage: () => {
      dispatch(singleNextPage());
    },
    onSinglePreviewPage: () => {
      dispatch(singlePreviewPage());
    },
    onDoubleNextPage: () => {
      dispatch(doubleNextPage());
    },
    onDoublePreviewPage: () => {
      dispatch(doublePreviewPage());
    }
  };
}

const MoveBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveBox);

export default MoveBoxContainer;
