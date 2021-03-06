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
    main: { file: mainFile, data: mainData.data, width: mainData.width, height: mainData.height },
    sub: initialStateMainOrSub
  };

  if (mainData.width >= mainData.height) {
    return mainOnlyState;
  }

  const subIndex = mainIndex + 1;
  if (subIndex < files.length) {
    const subFile = files[subIndex];
    const subFilePath = path.join(directory, subFile);
    const subData = ImageUtil.getImageData(subFilePath);
    if (subData.height > subData.width) {
      return {
        directory: directory,
        files: files,
        main: { file: mainFile, data: mainData.data, width: mainData.width, height: mainData.height },
        sub: { file: subFile, data: subData.data, width: subData.width, height: subData.height }
      };
    } else {
      return mainOnlyState;
    }
  } else {
    const subFile = files[0];
    const subFilePath = path.join(directory, subFile);
    const subData = ImageUtil.getImageData(subFilePath);
    if (subData.height > subData.width) {
      return {
        directory: directory,
        files: files,
        main: { file: mainFile, data: mainData.data, width: mainData.width, height: mainData.height },
        sub: { file: subFile, data: subData.data, width: subData.width, height: subData.height }
      };
    } else {
      return mainOnlyState;
    }
  }
}

function redrawPage(state) {
  return state;
}

function singleNextPage(state) {
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

  const currentIndex = state.files.indexOf(state.main.file);
  return getNextState(state, currentIndex);
}

function singlePreviewPage(state) {
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
    const nextIndex = currentIndex - 1;
    if (nextIndex > -1) {
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

    const nextMainFile = state.files[state.files.length - 1];
    const nextMainFilePath = path.join(state.directory, nextMainFile);
    const nextMainData = ImageUtil.getImageData(nextMainFilePath);
    return {
      directory: state.directory,
      files: state.files,
      main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
      sub: initialStateMainOrSub
    };
  }

  const currentIndex = state.files.indexOf(state.main.file);
  const nextIndex= currentIndex - 1;
  if (nextIndex > -1) {
    const nextMainFile = state.files[nextIndex];
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

    const nextSubFile = state.files[currentIndex];
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

  const nextMainFile = state.files[state.files.length - 1];
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

  const nextSubFile = state.files[currentIndex];
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
    const nextIndex = currentIndex - 1;
    if (nextIndex > -1) {
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

    const nextMainFile = state.files[state.files.length - 1];
    const nextMainFilePath = path.join(state.directory, nextMainFile);
    const nextMainData = ImageUtil.getImageData(nextMainFilePath);
    return {
      directory: state.directory,
      files: state.files,
      main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
      sub: initialStateMainOrSub
    };
  }

  const currentIndex = state.files.indexOf(state.main.file);
  const nextIndex1= currentIndex - 1;
  if (nextIndex1 > -1) {
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

    const nextIndex2 = nextIndex1 - 1;
    if (nextIndex2 > -1) {
      const nextSubFile = state.files[nextIndex2];
      const nextSubFilePath = path.join(state.directory, nextSubFile);
      const nextSubData = ImageUtil.getImageData(nextSubFilePath);
      if (nextSubData.height > nextSubData.width) {
        return {
          directory: state.directory,
          files: state.files,
          main: { file: nextSubFile, data: nextSubData.data, width: nextSubData.width, height: nextSubData.height },
          sub: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height }
        };
      }
      
      return {
        directory: state.directory,
        files: state.files,
        main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
        sub: initialStateMainOrSub
      };
    }

    const nextSubFile = state.files[state.files.length - 1];
    const nextSubFilePath = path.join(state.directory, nextSubFile);
    const nextSubData = ImageUtil.getImageData(nextSubFilePath);
    if (nextSubData.height > nextSubData.width) {
      return {
        directory: state.directory,
        files: state.files,
        main: { file: nextSubFile, data: nextSubData.data, width: nextSubData.width, height: nextSubData.height },
        sub: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height }
      };
    }
    
    return {
      directory: state.directory,
      files: state.files,
      main: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height },
      sub: initialStateMainOrSub
    };
  }

  const nextMainFile = state.files[state.files.length - 1];
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

  const nextSubFile = state.files[state.files.length - 2];
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
    main: { file: nextSubFile, data: nextSubData.data, width: nextSubData.width, height: nextSubData.height },
    sub: { file: nextMainFile, data: nextMainData.data, width: nextMainData.width, height: nextMainData.height }
  };
}

export default function page(state = initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return openFile(state, action.filePath);
    case REDRAW_PAGE:
      return redrawPage(state);
    case SINGLE_NEXT_PAGE:
      return singleNextPage(state);
    case SINGLE_PREVIEW_PAGE:
      return singlePreviewPage(state);
    case DOUBLE_NEXT_PAGE:
      return doubleNextPage(state);
    case DOUBLE_PREVIEW_PAGE:
      return doublePreviewPage(state);
    default:
      return state;
  }
}
