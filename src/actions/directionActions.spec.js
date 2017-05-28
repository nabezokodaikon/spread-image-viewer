import * as types from "../constants/ActionTypes";
import * as actions from "./directionActions";

describe("direction actions", () => {
  it("setDirectionMode should create SET_DIRECTION_MODE action", () => {
    expect(actions.setDirectionMode()).toEqual({
      type: types.SET_DIRECTION_MODE
    });
  });
});
