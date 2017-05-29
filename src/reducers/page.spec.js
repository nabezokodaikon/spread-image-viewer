import * as types from "../constants/ActionTypes";
import page from "./page";
import FileUtil from "../utils/FileUtil";
import ImageUtil from "../utils/ImageUtil";

const mainData = "mainData";
const subData = "subData";
const otherData1 = "otherData1";
const otherData2 = "otherData2";
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

describe("page reducer", () => {
  it("should handle OPEN_FILE", () => {
    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => []);
    expect(page(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "foo"
      })
    ).toEqual({
      directory: "",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01"]);
    expect(page(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "foo"
      })
    ).toEqual({
      directory: "",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 3, height: 2 };
      });
    expect(page(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "/img/img01"
      })
    ).toEqual({
      directory: "/img",
      files: ["img01"],
      main: {
        file: "img01",
        data: mainData,
        width: 3,
        height: 2 
      },
      sub: initialStateMainOrSub
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 3, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { data: subData, width: 1, height: 2 };
      });
    expect(page(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "/img/img01"
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: mainData,
        width: 3,
        height: 2 
      },
      sub: initialStateMainOrSub
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 1, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { data: subData, width: 3, height: 4 };
      });
    expect(page(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "/img/img01"
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: {
        file: "img02",
        data: subData,
        width: 3,
        height: 4 
      }
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02", "img03"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 1, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { data: subData, width: 5, height: 4 };
      });
    expect(page(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "/img/img01"
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: initialStateMainOrSub
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02", "img03"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 1, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { data: subData, width: 3, height: 2 };
      });
    expect(page(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "/img/img03"
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03"],
      main: {
        file: "img03",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: initialStateMainOrSub
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02", "img03"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 1, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { data: subData, width: 3, height: 4 };
      });
    expect(page(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "/img/img03"
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03"],
      main: {
        file: "img03",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: {
        file: "img01",
        data: subData,
        width: 3,
        height: 4 
      }
    });
  });

  it("should handle REDRAW_PAGE", () => {
    expect(page(
      undefined,
      {
        type: types.REDRAW_PAGE
      })
    ).toEqual({
      directory: "",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03"],
        main: {
          file: "img03",
          data: mainData,
          width: 2,
          height: 2 
        },
        sub: {
          file: "img01",
          data: subData,
          width: 2,
          height: 2 
        }
      },
      {
        type: types.REDRAW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03"],
      main: {
        file: "img03",
        data: mainData,
        width: 2,
        height: 2 
      },
      sub: {
        file: "img01",
        data: subData,
        width: 2,
        height: 2 
      }
    });
  });

  it("should handle SINGLE_NEXT_PAGE", () => {
    expect(page(
      undefined,
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    expect(page( {
        directory: "/img",
        files: [],
        main: initialStateMainOrSub,
        sub: initialStateMainOrSub
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "/img",
        files: ["img01"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 2,
          height: 3 
        }
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: {
        file: "img02",
        data: subData,
        width: 2,
        height: 3 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 2, height: 3 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img02",
        data: otherData1,
        width: 2,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 4, height: 3 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img02",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub 
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: otherData1,
        width: 4,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 4, height: 3 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 4,
          height: 3 
        }
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img02",
        data: otherData1,
        width: 4,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 3, height: 4 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img02",
        data: otherData1,
        width: 3,
        height: 4 
      },
      sub: {
        file: "img03",
        data: otherData2,
        width: 7,
        height: 8 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 3, height: 4 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 9, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img02",
        data: otherData1,
        width: 3,
        height: 4 
      },
      sub: initialStateMainOrSub 
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 3, height: 4 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img04",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 3,
        height: 4 
      },
      sub: {
        file: "img01",
        data: otherData2,
        width: 7,
        height: 8 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 3, height: 4 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 9, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img04",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 3,
        height: 4 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 4 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img04",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 5,
        height: 4 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 3, height: 4 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 4 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img04",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img01",
          data: mainData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 3,
        height: 4 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 3, height: 4 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 5, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img04",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img01",
          data: mainData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 3,
        height: 4 
      },
      sub: {
        file: "img02",
        data: otherData2,
        width: 5,
        height: 6 
      }
    });
  });

  it("should handle SINGLE_PREVIEW_PAGE", () => {
    expect(page(
      undefined,
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "",
        files: [],
        main: initialStateMainOrSub,
        sub: initialStateMainOrSub
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "/img",
        files: ["img01"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: {
        file: "img02",
        data: subData,
        width: 3,
        height: 4 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img02",
          data: mainData,
          width: 3,
          height: 2 
        },
        sub: initialStateMainOrSub 
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img01",
          data: mainData,
          width: 3,
          height: 2 
        },
        sub: initialStateMainOrSub 
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img02",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 7, height: 6 };
      })
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img02",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img03",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 7,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img02",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img03",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: {
        file: "img02",
        data: otherData2,
        width: 7,
        height: 8 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 9, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img02",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img03",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 7, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 7,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 9, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.SINGLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: {
        file: "img01",
        data: otherData2,
        width: 7,
        height: 8 
      }
    });
  });

  it("should handle DOUBLE_NEXT_PAGE", () => {
    expect(page(
      undefined,
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    expect(page( {
        directory: "/img",
        files: [],
        main: initialStateMainOrSub,
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "/img",
        files: ["img01"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 2, height: 3 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img02",
        data: otherData1,
        width: 2,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 2, height: 3 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img02",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: otherData1,
        width: 2,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: {
        file: "img02",
        data: subData,
        width: 3,
        height: 4 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 2, height: 3 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 4, height: 5 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03"],
      main: {
        file: "img02",
        data: otherData1,
        width: 2,
        height: 3 
      },
      sub: {
        file: "img03",
        data: otherData2,
        width: 4,
        height: 5 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 2, height: 3 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 6, height: 5 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03"],
      main: {
        file: "img02",
        data: otherData1,
        width: 2,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 2, height: 3 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 4, height: 5 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 2,
        height: 3 
      },
      sub: {
        file: "img01",
        data: otherData2,
        width: 4,
        height: 5 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 2, height: 3 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 6, height: 5 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 2,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 4, height: 3 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 4,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 4, height: 3 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img04",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 4,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 2, height: 3 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 4, height: 3 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img04",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 2,
        height: 3 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 2, height: 3 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 4, height: 5 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img04",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 2,
        height: 3 
      },
      sub: {
        file: "img02",
        data: otherData2,
        width: 4,
        height: 5 
      },
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 7, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img02",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img03",
          data: mainData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 7,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img03",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: {
        file: "img04",
        data: otherData2,
        width: 7,
        height: 8 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 9, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img03",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 7, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img04",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 7,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 7, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img04",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img04",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: {
        file: "img02",
        data: otherData2,
        width: 7,
        height: 8 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img04",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img01",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_NEXT_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img02",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: {
        file: "img03",
        data: otherData2,
        width: 7,
        height: 8 
      }
    });
  });

  it("should handle DOUBLE_PREVIEW_PAGE", () => {
    expect(page(
      undefined,
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    expect(page( {
        directory: "/img",
        files: [],
        main: initialStateMainOrSub,
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: [],
      main: initialStateMainOrSub,
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "/img",
        files: ["img01"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: initialStateMainOrSub
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: initialStateMainOrSub
    });

    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: mainData,
        width: 1,
        height: 2 
      },
      sub: {
        file: "img02",
        data: subData,
        width: 3,
        height: 4 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img02",
          data: mainData,
          width: 3,
          height: 2 
        },
        sub: initialStateMainOrSub 
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img01",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub 
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02"],
        main: {
          file: "img01",
          data: mainData,
          width: 3,
          height: 2 
        },
        sub: initialStateMainOrSub 
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02"],
      main: {
        file: "img02",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub 
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 7, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img02",
          data: mainData,
          width: 3,
          height: 4 
        },
        sub: {
          file: "img03",
          data: subData,
          width: 5,
          height: 6 
        }
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 7,
        height: 6 
      },
      sub: initialStateMainOrSub 
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 3,
          height: 4 
        },
        sub: {
          file: "img04",
          data: subData,
          width: 5,
          height: 6 
        }
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData2,
        width: 7,
        height: 8 
      },
      sub: {
        file: "img02",
        data: otherData1,
        width: 5,
        height: 6 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 9, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img03",
          data: mainData,
          width: 3,
          height: 4 
        },
        sub: {
          file: "img04",
          data: subData,
          width: 5,
          height: 6 
        }
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img02",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img02",
          data: mainData,
          width: 3,
          height: 4 
        },
        sub: {
          file: "img03",
          data: subData,
          width: 5,
          height: 6 
        }
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData2,
        width: 7,
        height: 8 
      },
      sub: {
        file: "img01",
        data: otherData1,
        width: 5,
        height: 6 
      }
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 9, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img02",
          data: mainData,
          width: 3,
          height: 4 
        },
        sub: {
          file: "img03",
          data: subData,
          width: 5,
          height: 6 
        }
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img01",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 7, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 7,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 6 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img04",
        data: otherData1,
        width: 5,
        height: 6 
      },
      sub: initialStateMainOrSub
    });

    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: otherData1, width: 5, height: 6 };
      })
      .mockImplementationOnce(f => {
        return { data: otherData2, width: 7, height: 8 };
      });
    expect(page(
      {
        directory: "/img",
        files: ["img01", "img02", "img03", "img04"],
        main: {
          file: "img01",
          data: mainData,
          width: 1,
          height: 2 
        },
        sub: {
          file: "img02",
          data: subData,
          width: 3,
          height: 4 
        }
      },
      {
        type: types.DOUBLE_PREVIEW_PAGE
      })
    ).toEqual({
      directory: "/img",
      files: ["img01", "img02", "img03", "img04"],
      main: {
        file: "img03",
        data: otherData2,
        width: 7,
        height: 8 
      },
      sub: {
        file: "img04",
        data: otherData1,
        width: 5,
        height: 6 
      }
    });
  });

  it ("should handle other action type", () => {
    expect(page(
      undefined,
      {
        type: "OTHER"
      }
    )).toEqual(
      initialState
    );
  });
});
