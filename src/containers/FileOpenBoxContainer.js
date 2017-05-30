"use strict";

import { connect } from "react-redux";
import { 
  openFile
} from "../actions/pageActions";
import FileOpenBox from "../components/FileOpenBox";

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: filePath => {
      dispatch(openFile(filePath));
    }
  };
}

const FileOpenBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileOpenBox);

export default FileOpenBoxContainer;
