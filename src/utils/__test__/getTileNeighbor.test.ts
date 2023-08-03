import { getTileNeighbor } from "../index";

describe("getTileNeighbor", () => {
  test("get tile neighbor", () => {
    const DATA = [
      { x: 0, y: 0, value: 2 },
      { x: 1, y: 0, value: 4 },
    ];
    const DATA_RESULT = { x: 1, y: 0, value: 4 };
    const tileOrigin = DATA[0];
    const allTiles = DATA;
    const direction = "ArrowRight";

    expect(getTileNeighbor(tileOrigin, allTiles, direction)).toEqual(
      expect.objectContaining(DATA_RESULT)
    );
  });
});
