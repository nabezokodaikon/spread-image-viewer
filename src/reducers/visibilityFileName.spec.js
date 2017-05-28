import * as types from "../constants/ActionTypes";
import visibilityFileName from "./visibilityFileName";

describe("visibilityFileName reducer", () => {
  it("should handle SET_VISIBILITY_FILE_NAME", () => {
    expect(visibilityFileName(
      undefined,
      {
        type: types.SET_VISIBILITY_FILE_NAME,
        visible: true
      }
    )).toEqual(
      true
    );

    expect(visibilityFileName(
      undefined,
      {
        type: types.SET_VISIBILITY_FILE_NAME,
        visible: false
      }
    )).toEqual(
      false
    );
  });

  it("should handle other action type", () => {
    expect(() => visibilityFileName(
      undefined,
      {
        type: "OTHER"
      })
    ).toThrowError("Action type \"OTHER\" is not define.");
  });
});
