"use strict";

import { remote } from "electron";
import React from "react";
import PropTypes from "prop-types";

class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  handleMouseOver() {
    this.props.onMouseOver(true);
  }

  handleResize(e) {
    console.log(`resize{ w: ${this.div.clientWidth}, h: ${ this.div.clientHeight } }`);
    const toolBarHeight = 32;
    this.canvas.width = this.div.clientWidth;
    this.canvas.height = this.div.clientHeight - toolBarHeight;
    const w = this.canvas.width * 0.8;
    const h = this.canvas.height * 0.8;
    const x = (this.canvas.width - w) / 2; 
    const y = (this.canvas.height - h) / 2; 
    const ctx = this.canvas.getContext('2d');
    ctx.fillRect(x, y, w, h);
  }

  componentDidMount() {
    console.log("componentDidMount");
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div
        className="imageView"
        onMouseOver={ this.handleMouseOver }
        ref={ e => { this.div = e; } }
      >
        <canvas
          ref={ e => { this.canvas = e; } }
        / >
      </div>
    );
  }
}

ImageView.propTypes = {
  onMouseOver: PropTypes.func.isRequired,
  main: PropTypes.shape({
    file: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  sub: PropTypes.shape({
    file: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  direction: PropTypes.string.isRequired
};

export default ImageView;
