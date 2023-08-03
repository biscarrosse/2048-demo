import { removeAtopTiles } from "../index";

describe("removeAtopTiles", () => {
  test("remove same location tile with lower value", () => {
    const DATA = [
      { x: 0, y: 0, value: 2 },
      { x: 0, y: 0, value: 4 },
      { x: 2, y: 0, value: 8 },
    ];
    const DATA_NEXT = [
      { x: 0, y: 0, value: 4 },
      { x: 2, y: 0, value: 8 },
    ];
    expect(removeAtopTiles(DATA)).toEqual(expect.arrayContaining(DATA_NEXT));
  });
});
