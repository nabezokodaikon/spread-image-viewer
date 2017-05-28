import * as types from "../constants/ActionTypes";
import * as actions from "./visibilityFileNameActions";

describe("visibilityFileName actions", () => {
  it("setVisibilityFileName should create SET_VISIBILITY_FILE_NAME action", () => {
    expect(actions.setVisibilityFileName()).toEqual({
      type: types.SET_VISIBILITY_FILE_NAME
    });
  });
});
