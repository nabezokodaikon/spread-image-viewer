"use strict";

import { connect } from "react-redux";
import FileNameBox from "../components/FileNameBox";

const mapStateToProps = (state) => {
  return {
    visibility: state.visibilityFileName,
    directory: state.page.directory,
    files: [state.page.main.file, state.page.sub.file]
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

const FileNameBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileNameBox);

export default FileNameBoxContainer;
