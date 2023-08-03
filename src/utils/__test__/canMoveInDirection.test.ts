import { canMoveInDirection } from "../index";

describe("canMoveInDirection", () => {
  const ALL_TILES = [
    { x: 0, y: 0, value: 2 },
    { x: 1, y: 0, value: 2 },
    { x: 2, y: 0, value: 2 },
    { x: 0, y: 1, value: 2 },
    { x: 1, y: 1, value: 2 },
    { x: 2, y: 1, value: 2 },
  ];

  test("can not move in direction left - is on the left end", () => {
    const LEFT = "ArrowLeft";
    const NO_MOVE = { canMove: false, canMerge: false };

    expect(canMoveInDirection(ALL_TILES[3], ALL_TILES, LEFT)).toEqual(
      expect.objectContaining(NO_MOVE)
    );
  });

  test("can move in direction right and merge", () => {
    const RIGHT = "ArrowRight";
    const CAN_MOVE_AND_MERGE = { canMove: true, canMerge: true };

    expect(canMoveInDirection(ALL_TILES[1], ALL_TILES, RIGHT)).toEqual(
      expect.objectContaining(CAN_MOVE_AND_MERGE)
    );
  });

  test("can move in direction right and not merge", () => {
    const RIGHT = "ArrowRight";
    const CAN_MOVE_AND_MERGE = { canMove: true, canMerge: false };

    expect(canMoveInDirection(ALL_TILES[2], ALL_TILES, RIGHT)).toEqual(
      expect.objectContaining(CAN_MOVE_AND_MERGE)
    );
  });
});
