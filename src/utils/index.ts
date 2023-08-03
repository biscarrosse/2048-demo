import type { AcceptedKey, TileType } from "../types";

const isDivisibleByFour = (num: number) => {
  const input = num.toString();

  if (input === "0") return false;
  if (input.length <= 2) {
    return !Boolean(num % 4);
  } else {
    const lastTwoCharacters = input.slice(input.length - 2, input.length);
    // +lastTwoCharacters would also produce a number
    // yet using Number constructor I make myself clear about my intention
    return !Boolean(Number(lastTwoCharacters) % 4);
  }
};

const removeItemFromArrayByIndex = (array: Array<TileType>, index: number) => {
  // return a new array withouth the object on input index:
  return array.slice(0, index).concat(array.slice(index + 1));
};

const removeAtopTiles = (tiles: Array<TileType>) => {
  let cleanedTiles: Array<TileType> = [];

  tiles.forEach((tile) => {
    if (cleanedTiles.length === 0) {
      cleanedTiles.push(tile);
    } else {
      const found = cleanedTiles.find((a) => a.x === tile.x && a.y === tile.y);

      if (!found) {
        cleanedTiles.push(tile);
      } else {
        const foundIndex = cleanedTiles.findIndex(
          (a) => a.x === found.x && a.y === found.y
        );

        const nextItem = {
          value: found.value >= tile.value ? found.value : tile.value,
          x: tile.x,
          y: tile.y,
        };

        if (foundIndex !== -1) {
          // remove found item:
          cleanedTiles = removeItemFromArrayByIndex(cleanedTiles, foundIndex);

          // push there the one with bigger value:
          cleanedTiles.push(nextItem);
        }
      }
    }
  });

  return cleanedTiles;
};

const getRandomIntegerFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getInitialTiles = (): Array<TileType> => {
  const data = [
    {
      value: 2,
      x: getRandomIntegerFromInterval(0, 3),
      y: getRandomIntegerFromInterval(0, 3),
    },
    {
      value: 2,
      x: getRandomIntegerFromInterval(0, 3),
      y: getRandomIntegerFromInterval(0, 3),
    },
  ];

  // lazy approach to check for duplicite tiles:
  if (data[0].x === data[1].x && data[0].y === data[1].y) {
    return getInitialTiles();
  }

  return data;
};

const getTileNeighbor = (
  tileOrigin: TileType,
  allTiles: Array<TileType>,
  direction: AcceptedKey
) => {
  if (direction === "ArrowRight") {
    if (tileOrigin.x === 3) return null;
    const found = allTiles.find(
      (tile) => tile.x === tileOrigin.x + 1 && tile.y === tileOrigin.y
    );
    return found ? found : null;
  }
  if (direction === "ArrowLeft") {
    if (tileOrigin.x === 0) return null;
    const found = allTiles.find(
      (tile) => tile.x === tileOrigin.x - 1 && tile.y === tileOrigin.y
    );
    return found ? found : null;
  }
  if (direction === "ArrowUp") {
    if (tileOrigin.y === 0) return null;
    const found = allTiles.find(
      (tile) => tile.y === tileOrigin.y - 1 && tile.x === tileOrigin.x
    );

    return found ? found : null;
  }
  if (direction === "ArrowDown") {
    if (tileOrigin.y === 3) return null;
    const found = allTiles.find(
      (tile) => tile.y === tileOrigin.y + 1 && tile.x === tileOrigin.x
    );
    return found ? found : null;
  }
};

type CanMove = {
  canMove: boolean;
  canMerge: boolean;
};
const canMoveInDirection = (
  tile: TileType,
  allTiles: Array<TileType>,
  direction: AcceptedKey
): CanMove => {
  // if tile is at last index (for the direction),
  // then it can not move in the direction
  if (direction === "ArrowRight") {
    if (tile.x === 3) return { canMove: false, canMerge: false };
  }
  if (direction === "ArrowLeft") {
    if (tile.x === 0) return { canMove: false, canMerge: false };
  }
  if (direction === "ArrowUp") {
    if (tile.y === 0) return { canMove: false, canMerge: false };
  }
  if (direction === "ArrowDown") {
    if (tile.y === 3) return { canMove: false, canMerge: false };
  }

  // if neighbor cell empty, tile can move in direction
  const neighbor = getTileNeighbor(tile, allTiles, direction);

  if (!neighbor) return { canMove: true, canMerge: false };

  // neighbor cell is occupied by another tile:
  // if neighbor tile has same value
  if (neighbor.value === tile.value) {
    // then tile can move there & merge
    // i.e.: the value will double & one tile will be removed
    return { canMove: true, canMerge: true };
  }

  // neighbor cell's tile has different value
  // but tile still can move there, if that tile can also move in the direction
  // hence, recursion:
  return canMoveInDirection(neighbor, allTiles, direction);
};

type NextTile = {
  currentTile: TileType;
  direction: AcceptedKey;
  canMerge: boolean;
};
const getNextTile = ({ currentTile, direction, canMerge }: NextTile) => {
  let nextTile = Object.assign({}, currentTile);
  if (canMerge) nextTile.value = 2 * nextTile.value;
  if (direction === "ArrowRight") {
    nextTile.x = nextTile.x + 1;
  }
  if (direction === "ArrowLeft") {
    nextTile.x = nextTile.x - 1;
  }
  if (direction === "ArrowUp") {
    nextTile.y = nextTile.y - 1;
  }
  if (direction === "ArrowDown") {
    nextTile.y = nextTile.y + 1;
  }
  return nextTile;
};

export {
  canMoveInDirection,
  getInitialTiles,
  getNextTile,
  getRandomIntegerFromInterval,
  getTileNeighbor,
  isDivisibleByFour,
  removeAtopTiles,
  removeItemFromArrayByIndex,
};
