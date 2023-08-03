import { getNextTile } from "../index";

describe("getNextTile", () => {
  const ALL_TILES = [
    { x: 0, y: 0, value: 2 },
    { x: 1, y: 0, value: 2 },
    { x: 2, y: 0, value: 2 },
    { x: 0, y: 1, value: 2 },
    { x: 1, y: 1, value: 2 },
    { x: 2, y: 1, value: 2 }, //
  ];

  test("get merged tile on the move left", () => {
    const LEFT = "ArrowLeft";
    const NEXT_TILE = { x: 1, y: 1, value: 4 };

    expect(
      getNextTile({
        currentTile: ALL_TILES[5],
        direction: LEFT,
        canMerge: true,
      })
    ).toEqual(expect.objectContaining(NEXT_TILE));
  });
});
