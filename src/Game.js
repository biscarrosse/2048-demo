import { useState, useEffect } from "react";
import { CELLS } from "./constants";
import styled from "styled-components";

const Tile = styled.div`
  position: absolute;
  transition: transform ease-in-out 200ms;

  width: 25%;
  aspect-ratio: 1;
  background-color: aquamarine;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: ${({ translateX, translateY }) => {
    const x = translateX === 0 ? 0 : translateX + "00%";
    const y = translateY === 0 ? 0 : translateY + "00%";
    return `translate(${x}, ${y})`;
  }};
`;
// TODO: TS

// TODO: func get random tile with value 2 to available position

// TODO: func get random initial tiles
// type Tile {
//   id: number,
//   value: number,
//   x: number,
//   y: number,
// }
const TILES_INITIAL = [
  { id: 0, value: 2, x: 0, y: 0 },
  { id: 0, value: 2, x: 0, y: 1 },
  { id: 0, value: 4, x: 2, y: 3 },
];

// type Direction = 'L' | 'R' | 'U' | 'D'
// type Cell = {
//   x: number
//   y: number
// }
// type Props = {
//   tile: Tile
//   allTiles: Array<Tile>
//   cells:
//   direction: Direction
// }
const moveTile = ({ tile, allTiles, cells, direction }) => {
  //
};

const Game = () => {
  const [tiles, setTiles] = useState(TILES_INITIAL);

  const moveTile = (tile, key) => {
    // read tiles position
    // read next desired position
    // decide if next desired position is possible
    // if not possible return
    // if possible, check if there is another tile
    // if it is, merge those tiles
    //    merge = creat new tile in the next position
    //    combine value of both tiles
    //
    // if not, just move the tile to the next position
  };

  // const Keys = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
  const handleEvent = ({ key }) => {
    const ACCEPTED_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    const found = ACCEPTED_KEYS.find((accepted_key) => key === accepted_key);
    if (!found) return;

    console.log("___ handleEvent ", key);
    // TODO: move all existing tiles in the e.key direction:

    tiles.forEach((tile) => {
      moveTile(tile, key);
    });
  };

  useEffect(() => {
    // listen for keys
    window.addEventListener("keydown", handleEvent);

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
  }, []);

  // TODO: listen for arrow keys press

  const startGame = () => {
    //
  };

  const getTile = (x, y) => {
    let res = null;
    tiles.forEach((tile) => {
      if (tile.x === x && tile.y === y) {
        res = tile;
      }
    });

    return res;
  };

  return (
    <>
      <div className="grid">
        {/* CELLS */}
        {CELLS.map((cell, idx) => {
          return <div key={idx} className="cell"></div>;
        })}

        {/* TILES */}
        {CELLS.map((cell, idx) => {
          const { x, y } = cell;
          const tile = getTile(x, y);

          return tile ? (
            <Tile key={idx} translateX={tile.x} translateY={tile.y}>
              <h1>{tile.value}</h1>
            </Tile>
          ) : null;
        })}
      </div>
    </>
  );
};

export default Game;
