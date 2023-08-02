export type TileType = Coordinate & {
  value: number;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type AcceptedKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
