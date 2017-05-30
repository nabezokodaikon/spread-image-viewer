"use strict";

import { connect } from "react-redux";
import { 
  setVisibilityFileName
} from "../actions/visibilityFileNameActions";
import ImageView from "../components/ImageView";

const mapStateToProps = (state) => {
  return {
    main: state.page.main,
    sub: state.page.sub,
    direction: state.direction
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMouseOver: (visible) => {
      dispatch(setVisibilityFileName(visible));
    },
    onMouseOut: (visible) => {
      dispatch(setVisibilityFileName(visible));
    }
  };
}

const ImageViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageView);

export default ImageViewContainer;
