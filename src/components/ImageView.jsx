"use strict";

import { remote } from "electron";
import React from "react";
import PropTypes from "prop-types";

class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver() {
    console.log("over");
    this.props.onMouseOver(true);
  }

  render() {
    return (
      <canvas
        className="imageView"
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }
        ref={ c => { this.canvas = c; } }
      / >
    );
  }
}

ImageView.propTypes = {
  onMouseOver: PropTypes.func.isRequired,
};

export default ImageView;
