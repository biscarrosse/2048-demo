import { isDivisibleByFour } from "../utils";
import type { AcceptedKey, Coordinate } from "../types";

// coordinates system convention
// [0,0] - - - > +x
//   |       [3, 0]
//   |       [3, 1]
//   |
//   v       [3, 3]
//   +y

const ACCEPTED_KEYS: Array<AcceptedKey> = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];

export const END_GAME = 2048;

const SIDE_SIZE = 4;

const CELLS_EMPTY: Array<null> = Array(SIDE_SIZE * SIDE_SIZE).fill(null);

const initVal: Array<Coordinate> = [];
const CELLS = CELLS_EMPTY.reduce((prev, _curr, idx) => {
  const isNewRow = isDivisibleByFour(idx);

  if (prev.length === 0) {
    prev[idx] = { x: 0, y: 0 };
    return prev;
  }
  if (isNewRow) {
    prev[idx] = { x: 0, y: prev[idx - 1].y + 1 };
    return prev;
  } else {
    prev[idx] = { x: prev[idx - 1].x + 1, y: prev[idx - 1].y };
    return prev;
  }
}, initVal);

export type TileKeys = keyof typeof TILE_VARIANTS;
const TILE_VARIANTS = {
  2: {
    bg: "rgb(239 242 255)",
    text: "black",
  },
  4: {
    bg: "rgb(231 237 255)",
    text: "black",
  },
  8: {
    bg: "rgb(214 220 255)",
    text: "black",
  },
  16: {
    bg: "rgb(195 204 255)",
    text: "black",
  },
  32: {
    bg: "rgb(188 209 255)",
    text: "black",
  },
  64: {
    bg: "rgb(135 172 255)",
    text: "white",
  },
  128: {
    bg: "rgb(118 160 255)",
    text: "white",
  },
  256: {
    bg: "rgb(93 142 255)",
    text: "white",
  },
  512: {
    bg: "rgb(63 121 255)",
    text: "white",
  },
  1024: {
    bg: "rgb(14 87 255)",
    text: "white",
  },
  2048: {
    bg: "rgb(2 54 172)",
    text: "white",
  },
};

export { ACCEPTED_KEYS, CELLS, TILE_VARIANTS };
