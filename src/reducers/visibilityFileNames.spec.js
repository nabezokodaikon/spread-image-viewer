import * as types from "../constants/ActionTypes";
import visibilityFileNames from "./visibilityFileNames";

describe("visibilityFileNames reducer", () => {
  it("should handle SET_VISIBILITY_FILE_NAMES", () => {
    expect(visibilityFileNames(
      undefined,
      {
        type: types.SET_VISIBILITY_FILE_NAMES,
        visible: true
      }
    )).toEqual(
      true
    );

    expect(visibilityFileNames(
      undefined,
      {
        type: types.SET_VISIBILITY_FILE_NAMES,
        visible: false
      }
    )).toEqual(
      false
    );
  });

  it("should handle other action type", () => {
    expect(() => visibilityFileNames(
      undefined,
      {
        type: "OTHER"
      })
    ).toThrowError("Action type \"OTHER\" is not define.");
  });
});
