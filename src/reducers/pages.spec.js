import * as types from "../constants/ActionTypes";
import pages from "./pages";
import FileUtil from "../utils/FileUtil";
import ImageUtil from "../utils/ImageUtil";

describe("pages reducer", () => {
  it("should handle OPEN_FILE", () => {

    const mainData = new Object("main");
    const subData = new Object("sub");

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => []);
    expect(pages(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "foo"
      })
    ).toEqual({
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
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01"]);
    expect(pages(
      undefined,
      {
        type: types.OPEN_FILE,
        filePath: "foo"
      })
    ).toEqual({
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
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 1, height: 2 };
      });
    expect(pages(
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
        width: 1,
        height: 2 
      },
      sub: {
        file: "",
        data: null,
        width: 0,
        height: 0 
      }
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 2, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { data: subData, width: 1, height: 2 };
      });
    expect(pages(
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
        width: 2,
        height: 2 
      },
      sub: {
        file: "",
        data: null,
        width: 0,
        height: 0 
      }
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 2, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { data: subData, width: 2, height: 2 };
      });
    expect(pages(
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
        width: 2,
        height: 2 
      },
      sub: {
        file: "img02",
        data: subData,
        width: 2,
        height: 2 
      }
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02", "img03"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 2, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { data: subData, width: 1, height: 2 };
      });
    expect(pages(
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
        width: 2,
        height: 2 
      },
      sub: {
        file: "",
        data: null,
        width: 0,
        height: 0 
      }
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02", "img03"]);
    ImageUtil.getImageData = jest.fn()
      .mockImplementationOnce(f => {
        return { data: mainData, width: 2, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { data: subData, width: 2, height: 2 };
      });
    expect(pages(
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

  it("should handle REDRAW_PAGE", () => {

    const mainData = new Object("main");
    const subData = new Object("sub");

    expect(pages(
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
});
