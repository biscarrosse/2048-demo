import { useState, useEffect } from "react";
import { ACCEPTED_KEYS, CELLS } from "../constants";
import { Tile } from "./Tile";

// const Koko = styled.div`
//   height: 100px;
//   width: ${({ width }) => {
//     return width;
//   }}px;
//   background-color: #768fc5;
//   margin: 0 auto; /* So as to center the box */
//   transition-property: width;
//   transition-duration: 250ms;
// `;

// TODO: TS

// TODO: func get random tile with value 2 to available position

// TODO: func get random initial tiles

const TILES_INITIAL = [
  { value: 2, x: 0, y: 0 },
  { value: 2, x: 0, y: 1 },
  { value: 4, x: 2, y: 3 },
];

const Game = () => {
  const [tiles, setTiles] = useState(TILES_INITIAL);

  // const Keys = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
  const handleEvent = ({ key }) => {
    const found = ACCEPTED_KEYS.find((accepted_key) => key === accepted_key);
    if (!found) return;

    // const direction = key;

    setTiles((_prev) => {
      return [
        // ...prev,
        { value: 2, x: 1, y: 0 },
        { value: 2, x: 1, y: 1 },
        { value: 4, x: 3, y: 3 },
      ];
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEvent);

    return () => {
      // cleanup

      window.removeEventListener("keydown", handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTile = (x, y, tiles) => {
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
        {tiles.map((tile, idx) => {
          return <Tile key={idx} tile={tile} />;
        })}
      </div>
    </>
  );
};

export default Game;
