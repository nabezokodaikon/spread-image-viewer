"use strict";

import { remote } from "electron";
import React from "react";
import PropTypes from "prop-types";

class FileOpenBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const files = remote.dialog.showOpenDialog({
      filters: [{ name: "Images", extensions: ["jpg", "png", "bmp"] }],
      properties: ['openFile']
    });

    if (files === undefined || files.length != 1) {
      return;
    }

    this.props.onClick(files[0]);
  };

  render() {
    return (
      <button
        className="toolButton fileOpenButton"
        onClick={ this.handleClick }
      >
        Open
      </button>
    );
  }
}

FileOpenBox.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default FileOpenBox;
