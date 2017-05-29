"use strict";

import React from "react";
import PropTypes from "prop-types";

class FileNameBox extends React.Component {
  constructor(props) {
    super(props);
  }

  getDirectory() {
    if (this.props.directory != "") {
      return <p className="fileName">{ this.props.directory }</p>;
    } else {
      return null;
    }
  }

  getMainFile() {
    if (this.props.files.length > 0) {
      return <p className="fileName">{ this.props.files[0] }</p>;
    } else {
      return null;
    }
  }

  getSubFile() {
    if (this.props.files.length > 1) {
      return <p className="fileName">{ this.props.files[1] }</p>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div
        className="fileNameBox"
      >
        { this.getDirectory() }
        { this.getMainFile() }
        { this.getSubFile() }
      </div>
    );
  }
}

FileNameBox.propTypes = {
  visibility: PropTypes.bool.isRequired,
  directory: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired
};

export default FileNameBox;
