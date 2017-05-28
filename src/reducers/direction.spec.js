import * as types from "../constants/ActionTypes";
import direction from "./direction";
import * as modes from "../constants/DirectionModes";

describe("direction reducer", () => {
  it ("should handle SET_DIRECTION_MODE", () => {
    expect(direction(
      undefined,
      {
        type: types.SET_DIRECTION_MODE,
        mode: modes.LEFT_DIRECTION_MODE
      }
    )).toEqual(
      modes.LEFT_DIRECTION_MODE
    );

    expect(direction(
      undefined,
      {
        type: types.SET_DIRECTION_MODE,
        mode: modes.RIGHT_DIRECTION_MODE
      }
    )).toEqual(
      modes.RIGHT_DIRECTION_MODE
    );
  });

  it ("should handle other action type", () => {
    expect(direction(
      undefined,
      {
        type: "OTHER"
      }
    )).toEqual(
      modes.LEFT_DIRECTION_MODE
    );
  });
});
