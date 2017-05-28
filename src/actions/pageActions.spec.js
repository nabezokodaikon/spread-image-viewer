import * as types from "../constants/ActionTypes";
import * as actions from "./pageActions";

describe("page actions", () => {
  it("openFile should create OPEN_FILE action", () => {
    expect(actions.openFile("foo")).toEqual({
      type: types.OPEN_FILE,
      filePath: "foo"
    });
  });

  it("redrawPage should create REDRAW_PAGE action", () => {
    expect(actions.redrawPage()).toEqual({
      type: types.REDRAW_PAGE
    });
  });

  it("singleNextPage should create SINGLE_NEXT_PAGE action", () => {
    expect(actions.singleNextPage()).toEqual({
      type: types.SINGLE_NEXT_PAGE
    });
  });

  it("singlePreviewPage should create SINGLE_PREVIEW_PAGE action", () => {
    expect(actions.singlePreviewPage()).toEqual({
      type: types.SINGLE_PREVIEW_PAGE
    });
  });

  it("doubleNextPage should create DOUBLE_NEXT_PAGE action", () => {
    expect(actions.doubleNextPage()).toEqual({
      type: types.DOUBLE_NEXT_PAGE
    });
  });

  it("doublePreviewPage should create DOUBLE_PREVIEW_PAGE action", () => {
    expect(actions.doublePreviewPage()).toEqual({
      type: types.DOUBLE_PREVIEW_PAGE
    });
  });
});
