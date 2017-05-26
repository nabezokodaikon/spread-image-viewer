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
  main: "",
  sub: ""
};

function openFile(state, mainFilePath) {
  const directory = path.dirname(mainFilePath);
  const files = FileUtil.getImageFiles(directory);
  if (files.length < 1) {
    return state;
  }

  const main = path.basename(mainFilePath);
  const mainIndex = files.indexOf(main);
  if (mainIndex < 0) {
    return state;
  }

  const mainOnlyState = {
    directory: directory,
    files: files,
    main: main,
    sub: ""
  };

  const mainSize = ImageUtil.getImageSize(mainFilePath);
  if (mainSize.height > mainSize.width) {
    return mainOnlyState;
  }

  const subIndex = mainIndex + 1;
  if (subIndex < files.length) {
    const sub = files[subIndex];
    const subFilePath = path.join(directory, sub);
    const subSize = ImageUtil.getImageSize(subFilePath);
    if (subSize.height > subSize.width) {
      return mainOnlyState;
    } else {
      return {
        directory: directory,
        files: files,
        main: main,
        sub: sub
      };
    }
  } else {
    const sub = files[0];
    const subFilePath = path.join(directory, sub);
    const subSize = ImageUtil.getImageSize(subFilePath);
    if (subSize.height > subSize.width) {
      return mainOnlyState;
    } else {
      return {
        directory: directory,
        files: files,
        main: main,
        sub: sub
      };
    }
  }
}

export default function pages(state = initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return openFile(state, action.filePath);
    case REDRAW_PAGE:
      return;
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
