const isDivisibleByFour = (num) => {
  const input = typeof num === "number" ? num.toString() : num;

  if (input === "0") return false;
  if (input.length <= 2) return !Boolean(input % 4);

  const lastTwoCharacters = input.slice(input.length - 2, input.length);
  // +lastTwoCharacters would also produce a number
  // yet using Number constructor I make myself clear about my intention
  return !Boolean(Number(lastTwoCharacters) % 4);
};

const removeItemFromArrayByIndex = (array, index) => {
  // return a new array withouth the object on input index:
  return array.slice(0, index).concat(array.slice(index + 1));
};

// const TEST_TILES = [
//   { value: 2, x: 0, y: 1 },
//   { value: 4, x: 1, y: 1 },
//   { value: 2, x: 3, y: 3 },
//   { value: 2, x: 3, y: 3 },
//   { value: 2, x: 3, y: 2 },
//   { value: 4, x: 3, y: 2 },
// ];
// const TEST_TILES_EXPECTED_RESULT = [
//   { value: 2, x: 0, y: 1 },
//   { value: 4, x: 1, y: 1 },
//   { value: 2, x: 3, y: 3 },
//   { value: 4, x: 3, y: 2 },
// ];
const removeAtopTiles = (tiles) => {
  let cleanedTiles = [];

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

const getRandomIntegerFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getInitialTiles = () => {
  return [
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
};

export {
  getInitialTiles,
  getRandomIntegerFromInterval,
  isDivisibleByFour,
  removeAtopTiles,
  removeItemFromArrayByIndex,
};
