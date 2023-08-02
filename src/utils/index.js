const isDivisibleByFour = (num) => {
  const input = typeof num === "number" ? num.toString() : num;

  if (input === "0") return false;
  if (input.length <= 2) return !Boolean(input % 4);

  const lastTwoCharacters = input.slice(input.length - 2, input.length);
  // +lastTwoCharacters would also produce a number
  // yet using Number constructor I make myself clear about my intention
  return !Boolean(Number(lastTwoCharacters) % 4);
};

const getCollidingTile = (nextCoordinates, allCurrentTiles, direction) => {
  const collidingTile = allCurrentTiles.find(
    (tile) => tile.x === nextCoordinates.x && tile.y === nextCoordinates.y
  );

  if (!collidingTile) {
    return null;
  } else {
    // colliding tile can NOT move in the next direction,
    // hence return the colliding tile:
    if (direction === "ArrowRight" && collidingTile.x === 3) {
      return collidingTile;
    } else if (direction === "ArrowUp" && collidingTile.y === 0) {
      return collidingTile;
    } else if (direction === "ArrowLeft" && collidingTile.x === 0) {
      return collidingTile;
    } else if (direction === "ArrowDown" && collidingTile.y === 3) {
      return collidingTile;
    } else {
      // colliding tile can move in the next direction,
      // hence return null, no collision
      return null;
    }
  }
};

const removeAtopTiles = (tiles) => {
  const accumulated = [];
  tiles.forEach((tile) => {
    if (!accumulated.length) {
      accumulated.push(tile);
    }
    const found = accumulated.find((a) => a.x === tile.x && a.y === tile.y);
    if (!found) {
      accumulated.push(tile);
    }
  });

  return accumulated;
};

export { getCollidingTile, isDivisibleByFour, removeAtopTiles };
