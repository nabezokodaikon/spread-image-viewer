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
  data: "",
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
  if (nextIndex < state.files.length) {
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
  } else {
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
  }
}

function singlePreviewPage(state) {
  if (state.directory == "") {
    return state;
  }

  const currentIndex = state.files.indexOf(state.main.file);
  const prevIndex = currentIndex - 1;
  if (prevIndex > -1) {
    const prevFile = state.files[prevIndex];
    const prevFilePath = path.join(state.directory, prevFile);
    const prevFileData = ImageUtil.getImageData(prevFilePath);
    return {
      directory: state.directory,
      files: state.files,
      main: {
        file: prevFile,
        data: prevFileData.data,
        width: prevFileData.width,
        height: prevFileData.height
      },
      sub: initialStateMainOrSub
    }
  } else {
    const prevFile = state.files[state.files.length - 1];
    const prevFilePath = path.join(state.directory, prevFile);
    const prevFileData = ImageUtil.getImageData(prevFilePath);
    return {
      directory: state.directory,
      files: state.files,
      main: {
        file: prevFile,
        data: prevFileData.data,
        width: prevFileData.width,
        height: prevFileData.height
      },
      sub: initialStateMainOrSub
    }
  }
}

function doubleNextPage(state) {
  if (state.files.length < 1) {
    return state;
  }

  if (state.files.length == 1) {
    return state;
  }
  
  if (state.files.length == 2) {
    if (state.sub.file != "") {
      return state;
    }

    const currentIndex = state.files.indexOf(state.main.file);
    const nextIndex = currentIndex + 1;
    if (nextIndex < state.files.length) {
      const nextMainFile = state.files[nextIndex];
      const nextMainFilePath = path.join(state.directory, nextMainFile);
      const nextMainData = ImageUtil.getImageData(nextMainFilePath);
      return {
        directory: state.directory,
        files: state.files,
        main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
        sub: initialStateMainOrSub
      };
    }

    const nextMainFile = state.files[0];
    const nextMainFilePath = path.join(state.directory, nextMainFile);
    const nextMainData = ImageUtil.getImageData(nextMainFilePath);
    return {
      directory: state.directory,
      files: state.files,
      main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
      sub: initialStateMainOrSub
    };
  }

  function getNextState(state, currentIndex) {
    const nextIndex1= currentIndex + 1;
    if (nextIndex1 < state.files.length) {
      const nextMainFile = state.files[nextIndex1];
      const nextMainFilePath = path.join(state.directory, nextMainFile);
      const nextMainData = ImageUtil.getImageData(nextMainFilePath);
      if (nextMainData.width >= nextMainData.height) {
        return {
          directory: state.directory,
          files: state.files,
          main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
          sub: initialStateMainOrSub
        };
      }

      const nextIndex2 = nextIndex1 + 1;
      if (nextIndex2 < state.files.length) {
        const nextSubFile = state.files[nextIndex2];
        const nextSubFilePath = path.join(state.directory, nextSubFile);
        const nextSubData = ImageUtil.getImageData(nextSubFilePath);
        if (nextSubData.height > nextSubData.width) {
          return {
            directory: state.directory,
            files: state.files,
            main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
            sub: { file: nextSubFile, data: nextSubData.data, width: nextSubData.width, height: nextSubData.height }
          };
        }
        
        return {
          directory: state.directory,
          files: state.files,
          main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
          sub: initialStateMainOrSub
        };
      }

      const nextSubFile = state.files[0];
      const nextSubFilePath = path.join(state.directory, nextSubFile);
      const nextSubData = ImageUtil.getImageData(nextSubFilePath);
      if (nextSubData.height > nextSubData.width) {
        return {
          directory: state.directory,
          files: state.files,
          main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
          sub: { file: nextSubFile, data: nextSubData.data, width: nextSubData.width, height: nextSubData.height }
        };
      }
      
      return {
        directory: state.directory,
        files: state.files,
        main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
        sub: initialStateMainOrSub
      };
    }

    const nextMainFile = state.files[0];
    const nextMainFilePath = path.join(state.directory, nextMainFile);
    const nextMainData = ImageUtil.getImageData(nextMainFilePath);
    if (nextMainData.width >= nextMainData.height) {
      return {
        directory: state.directory,
        files: state.files,
        main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
        sub: initialStateMainOrSub
      };
    }

    const nextSubFile = state.files[1];
    const nextSubFilePath = path.join(state.directory, nextSubFile);
    const nextSubData = ImageUtil.getImageData(nextSubFilePath);
    if (nextSubData.width >= nextSubData.height) {
      return {
        directory: state.directory,
        files: state.files,
        main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
        sub: initialStateMainOrSub
      };
    }

    return {
      directory: state.directory,
      files: state.files,
      main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
      sub: { file: nextSubFile, data: nextSubData.data, width: nextSubData.width, height: nextSubData.height }
    };
  }

  if (state.sub.file == "") {
    const currentIndex = state.files.indexOf(state.main.file);
    return getNextState(state, currentIndex);
  } else {
    const currentIndex = state.files.indexOf(state.sub.file);
    return getNextState(state, currentIndex);
  }
}

function doublePreviewPage(state) {
  if (state.files.length < 1) {
    return state;
  }

  if (state.files.length == 1) {
    return state;
  }
  
  if (state.files.length == 2) {
    if (state.sub.file != "") {
      return state;
    }

    const currentIndex = state.files.indexOf(state.main.file);
    const prevIndex = currentIndex - 1;
    if (prevIndex > -1) {
      const prevMainFile = state.files[prevIndex];
      const prevMainFilePath = path.join(state.directory, prevMainFile);
      const prevMainData = ImageUtil.getImageData(prevMainFilePath);
      return {
        directory: state.directory,
        files: state.files,
        main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
        sub: initialStateMainOrSub
      };
    }

    const prevMainFile = state.files[state.files.length - 1];
    const prevMainFilePath = path.join(state.directory, prevMainFile);
    const prevMainData = ImageUtil.getImageData(prevMainFilePath);
    return {
      directory: state.directory,
      files: state.files,
      main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
      sub: initialStateMainOrSub
    };
  }

  const currentIndex = state.files.indexOf(state.main.file);
  const prevIndex1= currentIndex - 1;
  if (prevIndex1 > -1) {
    const prevMainFile = state.files[prevIndex1];
    const prevMainFilePath = path.join(state.directory, prevMainFile);
    const prevMainData = ImageUtil.getImageData(prevMainFilePath);
    if (prevMainData.width >= prevMainData.height) {
      return {
        directory: state.directory,
        files: state.files,
        main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
        sub: initialStateMainOrSub
      };
    }

    const prevIndex2 = prevIndex1 - 1;
    if (prevIndex2 > -1) {
      const prevSubFile = state.files[prevIndex2];
      const prevSubFilePath = path.join(state.directory, prevSubFile);
      const prevSubData = ImageUtil.getImageData(prevSubFilePath);
      if (prevSubData.height > prevSubData.width) {
        return {
          directory: state.directory,
          files: state.files,
          main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
          sub: { file: prevSubFile, data: prevSubData.data, width: prevSubData.width, height: prevSubData.height }
        };
      }
      
      return {
        directory: state.directory,
        files: state.files,
        main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
        sub: initialStateMainOrSub
      };
    }

    const prevSubFile = state.files[state.files.length - 1];
    const prevSubFilePath = path.join(state.directory, prevSubFile);
    const prevSubData = ImageUtil.getImageData(prevSubFilePath);
    if (prevSubData.height > prevSubData.width) {
      return {
        directory: state.directory,
        files: state.files,
        main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
        sub: { file: prevSubFile, data: prevSubData.data, width: prevSubData.width, height: prevSubData.height }
      };
    }
    
    return {
      directory: state.directory,
      files: state.files,
      main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
      sub: initialStateMainOrSub
    };
  }

  const prevMainFile = state.files[state.files.length - 1];
  const prevMainFilePath = path.join(state.directory, prevMainFile);
  const prevMainData = ImageUtil.getImageData(prevMainFilePath);
  if (prevMainData.width >= prevMainData.height) {
    return {
      directory: state.directory,
      files: state.files,
      main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
      sub: initialStateMainOrSub
    };
  }

  const prevSubFile = state.files[state.files.length - 2];
  const prevSubFilePath = path.join(state.directory, prevSubFile);
  const prevSubData = ImageUtil.getImageData(prevSubFilePath);
  if (prevSubData.width >= prevSubData.height) {
    return {
      directory: state.directory,
      files: state.files,
      main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
      sub: initialStateMainOrSub
    };
  }

  return {
    directory: state.directory,
    files: state.files,
    main: { file: prevMainFile, data: prevMainData.data, width: prevMainData.width, height: prevMainData.height },
    sub: { file: prevSubFile, data: prevSubData.data, width: prevSubData.width, height: prevSubData.height }
  };
}


export default function page(state = initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      console.log(`OPEN_FILE: ${action.filePath}`);
      return openFile(state, action.filePath);
    case REDRAW_PAGE:
      return redrawPage(state);
    case SINGLE_NEXT_PAGE:
      console.log(SINGLE_NEXT_PAGE);
      return singleNextPage(state);
    case SINGLE_PREVIEW_PAGE:
      console.log(SINGLE_PREVIEW_PAGE);
      return singlePreviewPage(state);
    case DOUBLE_NEXT_PAGE:
      console.log(DOUBLE_NEXT_PAGE);
      return doubleNextPage(state);
    case DOUBLE_PREVIEW_PAGE:
      console.log(DOUBLE_PREVIEW_PAGE);
      return doublePreviewPage(state);
    default:
      return state;
  }
}
