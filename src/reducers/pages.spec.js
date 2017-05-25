import pages from "./pages";
import ImageUtil from "../utils/ImageUtil";

describe("pages reducer", () => {
  it("example test", () => {
    // ImageUtil.getImageSize = jest.fn((a) => a * 10);
    ImageUtil.getImageSize = jest.fn()
      .mockImplementationOnce(a => a + 1)
      .mockImplementationOnce(a => a * 3);
    const ret = pages(2);
    expect(
      ret
    ).toEqual(9);
  });
});
