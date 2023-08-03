import { getInitialTiles } from "../index";

describe("getInitialTiles", () => {
  test("get initial tiles correct value", () => {
    expect(getInitialTiles()[0].value).toEqual(2);
    expect(getInitialTiles()[0].x).toBeLessThanOrEqual(3);
    expect(getInitialTiles()[0].x).toBeGreaterThanOrEqual(0);
    expect(getInitialTiles()[0].y).toBeLessThanOrEqual(3);
    expect(getInitialTiles()[0].y).toBeGreaterThanOrEqual(0);
  });
});
