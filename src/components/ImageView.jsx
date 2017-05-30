"use strict";

import { remote } from "electron";
import React from "react";
import PropTypes from "prop-types";
import ImageUtil from "../utils/ImageUtil";
import {
  LEFT_DIRECTION_MODE,
  RIGHT_DIRECTION_MODE
} from "../constants/DirectionModes";

class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  getToolBarHeight() {
    return 32;
  }

  drawImage() {
    if (this.props.main.file == "") {
      return;
    }

    if (this.ctx == null) {
      this.ctx = this.canvas.getContext('2d');
    }
    
    if (this.props.sub.file == "") {
      const img = new Image();
      img.onload = () => {
        const destRectangle = ImageUtil.getSingleDrawRectangle(
          { width: this.props.main.width, height: this.props.main.height },
          { x: 0, y: 0, width: this.canvas.width, height: this.canvas.height });
        this.ctx.drawImage(img,
          0, 0, this.props.main.width, this.props.main.height,
          destRectangle.x, destRectangle.y, destRectangle.width, destRectangle.height);
      };
      img.src = this.props.main.data;
    } else {
      const imgs = this.props.direction == LEFT_DIRECTION_MODE ?
        { left: this.props.main, right: this.props.sub } :
        { left: this.props.sub, right: this.props.main };

      const imgLeft = new Image();
      imgLeft.onload = () => {
        const destRectangle = ImageUtil.getLeftDrawRectangle(
          { width: imgs.left.width, height: imgs.left.height },
          { x: 0, y: 0, width: this.canvas.width / 2, height: this.canvas.height });
        this.ctx.drawImage(imgLeft,
          0, 0, imgs.left.width, imgs.left.height,
          destRectangle.x, destRectangle.y, destRectangle.width, destRectangle.height);
      };
      imgLeft.src = imgs.left.data;

      const imgRight = new Image();
      imgRight.onload = () => {
        const destRectangle = ImageUtil.getRightDrawRectangle(
          { width: imgs.right.width, height: imgs.right.height },
          { x: this.canvas.width / 2, y: 0, width: this.canvas.width / 2, height: this.canvas.height });
        this.ctx.drawImage(imgRight,
          0, 0, imgs.right.width, imgs.right.height,
          destRectangle.x, destRectangle.y, destRectangle.width, destRectangle.height);
      };
      imgRight.src = imgs.right.data;
    }
  }

  handleMouseOver() {
    this.props.onMouseOver(true);
  }

  handleResize(e) {
    // console.log(`resize{ w: ${this.div.clientWidth}, h: ${ this.div.clientHeight } }`);
    this.canvas.width = this.div.clientWidth;
    this.canvas.height = this.div.clientHeight - this.getToolBarHeight();
    this.drawImage();
  }

  componentDidMount() {
    console.log("componentDidMount");
    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    this.canvas.width = this.div.clientWidth;
    this.canvas.height = this.div.clientHeight - this.getToolBarHeight();
    this.drawImage();
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
