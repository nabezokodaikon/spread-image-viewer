"use strict";

import { connect } from "react-redux";
import { 
  setVisibilityFileName
} from "../actions/visibilityFileNameActions";
import ToolBar from "../components/ToolBar";

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMouseOver: (visible) => {
      dispatch(setVisibilityFileName(visible));
    }
  };
}

const ToolBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar);

export default ToolBarContainer;
