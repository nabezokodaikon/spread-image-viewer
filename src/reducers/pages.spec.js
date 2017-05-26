import * as types from "../constants/ActionTypes";
import pages from "./pages";
import FileUtil from "../utils/FileUtil";
import ImageUtil from "../utils/ImageUtil";

describe("pages reducer", () => {
  it("should handle OPEN_FILE", () => {
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
      main: "",
      sub: ""
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
      main: "",
      sub: ""
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01"]);
    ImageUtil.getImageSize = jest.fn()
      .mockImplementationOnce(f => {
        return { width: 1, height: 2 };
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
      main: "img01",
      sub: ""
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02"]);
    ImageUtil.getImageSize = jest.fn()
      .mockImplementationOnce(f => {
        return { width: 2, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { width: 1, height: 2 };
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
      main: "img01",
      sub: ""
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02"]);
    ImageUtil.getImageSize = jest.fn()
      .mockImplementationOnce(f => {
        return { width: 2, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { width: 2, height: 2 };
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
      main: "img01",
      sub: "img02"
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02", "img03"]);
    ImageUtil.getImageSize = jest.fn()
      .mockImplementationOnce(f => {
        return { width: 2, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { width: 1, height: 2 };
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
      main: "img03",
      sub: ""
    });

    FileUtil.getImageFiles = jest.fn()
      .mockImplementationOnce(f => ["img01", "img02", "img03"]);
    ImageUtil.getImageSize = jest.fn()
      .mockImplementationOnce(f => {
        return { width: 2, height: 2 };
      })
      .mockImplementationOnce(f => {
        return { width: 2, height: 2 };
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
      main: "img03",
      sub: "img01"
    });
  });
});
