import { removeItemFromArrayByIndex } from "../index";

describe("removeItemFromArrayByIndex", () => {
  test("remove item from array by index", () => {
    const DATA = [
      { x: 0, y: 0, value: 2 },
      { x: 1, y: 0, value: 4 },
      { x: 2, y: 0, value: 8 },
    ];
    const DATA_NEXT = [
      { x: 0, y: 0, value: 2 },
      { x: 2, y: 0, value: 8 },
    ];
    expect(removeItemFromArrayByIndex(DATA, 1)).toHaveLength(2);
    expect(removeItemFromArrayByIndex(DATA, 1)).toEqual(
      expect.arrayContaining(DATA_NEXT)
    );
  });
});
