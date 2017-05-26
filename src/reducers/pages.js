"use strict";

import path from "path";
import FileUtil from "../utils/FileUtil";
import ImageUtil from "../utils/ImageUtil";
import {
  OPEN_FILE,
  REDRAW_PAGE,
  SINGLE_NEXT_PAGE,
  SINGLE_PREVIEW_PAGE,
  DOUBLE_NEXT_PAGE,
  DOUBLE_PREVIEW_PAGE
} from "../constants/ActionTypes";

const initialState = {
  directory: "",
  files: [],
  main: {
    file: "",
    data: null,
    width: 0,
    height: 0 
  },
  sub: {
    file: "",
    data: null,
    width: 0,
    height: 0 
  }
};

function openFile(state, mainFilePath) {
  const directory = path.dirname(mainFilePath);
  const files = FileUtil.getImageFiles(directory);
  if (files.length < 1) {
    return state;
  }

  const mainFile = path.basename(mainFilePath);
  const mainIndex = files.indexOf(mainFile);
  if (mainIndex < 0) {
    return state;
  }

  const mainData = ImageUtil.getImageSize(mainFilePath);
  const mainOnlyState = {
    directory: directory,
    files: files,
    main: {
      file: mainFile,
      data: mainData.data,
      width: mainData.width,
      height: mainData.height
    },
    sub: {
      file: "",
      data: null,
      width: 0,
      height: 0 
    }
  };

  if (mainData.height > mainData.width) {
    return mainOnlyState;
  }

  const subIndex = mainIndex + 1;
  if (subIndex < files.length) {
    const subFile = files[subIndex];
    const subFilePath = path.join(directory, subFile);
    const subData = ImageUtil.getImageSize(subFilePath);
    if (subData.height > subData.width) {
      return mainOnlyState;
    } else {
      return {
        directory: directory,
        files: files,
        main: {
          file: mainFile,
          data: mainData.data,
          width: mainData.width,
          height: mainData.height
        },
        sub: {
          file: subFile,
          data: subData.data,
          width: subData.width,
          height: subData.height 
        }
      };
    }
  } else {
    const subFile = files[0];
    const subFilePath = path.join(directory, subFile);
    const subData = ImageUtil.getImageSize(subFilePath);
    if (subData.height > subData.width) {
      return mainOnlyState;
    } else {
      return {
        directory: directory,
        files: files,
        main: {
          file: mainFile,
          data: mainData.data,
          width: mainData.width,
          height: mainData.height
        },
        sub: {
          file: subFile,
          data: subData.data,
          width: subData.width,
          height: subData.height 
        }
      };
    }
  }
}

function redrawPage(state) {
  return state;
}

export default function pages(state = initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return openFile(state, action.filePath);
    case REDRAW_PAGE:
      return redrawPage(state);
    case SINGLE_NEXT_PAGE:
      return;
    case SINGLE_PREVIEW_PAGE:
      return;
    case DOUBLE_NEXT_PAGE:
      return;
    case DOUBLE_PREVIEW_PAGE:
      return;
    default:
      throw `Action type ${action.type} is not define.`
  }
}
