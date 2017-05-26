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

const initialStateMainOrSub = {
  file: "",
  data: null,
  width: 0,
  height: 0
};
const initialState = {
  directory: "",
  files: [],
  main: initialStateMainOrSub,
  sub: initialStateMainOrSub
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

  const mainData = ImageUtil.getImageData(mainFilePath);
  const mainOnlyState = {
    directory: directory,
    files: files,
    main: {
      file: mainFile,
      data: mainData.data,
      width: mainData.width,
      height: mainData.height
    },
    sub: initialStateMainOrSub
  };

  if (mainData.height > mainData.width) {
    return mainOnlyState;
  }

  const subIndex = mainIndex + 1;
  if (subIndex < files.length) {
    const subFile = files[subIndex];
    const subFilePath = path.join(directory, subFile);
    const subData = ImageUtil.getImageData(subFilePath);
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
    const subData = ImageUtil.getImageData(subFilePath);
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

function singleNextPage(state) {
  if (state.directory == "") {
    return state;
  }

  const currentIndex = state.files.indexOf(state.main.file);
  const nextIndex = currentIndex + 1;
  if (nextIndex >= state.files.length) {
    const nextFile = state.files[0];
    const nextFilePath = path.join(state.directory, nextFile);
    const nextFileData = ImageUtil.getImageData(nextFilePath);
    return {
      directory: state.directory,
      files: state.files,
      main: {
        file: nextFile,
        data: nextFileData.data,
        width: nextFileData.width,
        height: nextFileData.height
      },
      sub: initialStateMainOrSub
    }
  } else {
    const nextFile = state.files[nextIndex];
    const nextFilePath = path.join(state.directory, nextFile);
    const nextFileData = ImageUtil.getImageData(nextFilePath);
    return {
      directory: state.directory,
      files: state.files,
      main: {
        file: nextFile,
        data: nextFileData.data,
        width: nextFileData.width,
        height: nextFileData.height
      },
      sub: initialStateMainOrSub
    }
  }
}

export default function pages(state = initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return openFile(state, action.filePath);
    case REDRAW_PAGE:
      return redrawPage(state);
    case SINGLE_NEXT_PAGE:
      return singleNextPage(state);
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
