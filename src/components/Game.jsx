import { useState, useEffect } from "react";
import { ACCEPTED_KEYS, CELLS, TILES_INITIAL } from "../constants";
import { getCollidingTile, removeAtopTiles } from "../utils";
import { Tile } from "./Tile";

// TODO: TS
// TODO: func get random tile with value 2 to available position

const Game = () => {
  const [tiles, setTiles] = useState(TILES_INITIAL);

  // const Keys = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
  const handleEvent = ({ key: direction }) => {
    const found = ACCEPTED_KEYS.find(
      (accepted_key) => direction === accepted_key
    );
    if (!found) return;

    setTiles((prev) => {
      const nextTiles = prev.map((prevTile) => {
        let nextTile = Object.assign({}, prevTile);
        let nextCoordinates = {
          x: null,
          y: null,
        };

        if (direction === "ArrowRight") {
          nextCoordinates = {
            x: nextTile.x === 3 ? 3 : nextTile.x + 1,
            y: nextTile.y,
          };
        }
        if (direction === "ArrowUp") {
          nextCoordinates = {
            x: nextTile.x,
            y: nextTile.y === 0 ? 0 : nextTile.y - 1,
          };
        }
        if (direction === "ArrowLeft") {
          nextCoordinates = {
            x: nextTile.x === 0 ? 0 : nextTile.x - 1,
            y: nextTile.y,
          };
        }
        if (direction === "ArrowDown") {
          nextCoordinates = {
            x: nextTile.x,
            y: nextTile.y === 3 ? 3 : nextTile.y + 1,
          };
        }
        const collidingTile = getCollidingTile(
          nextCoordinates,
          prev,
          direction
        );

        if (collidingTile && nextTile.value === collidingTile.value) {
          // merge two tiles into one
          // double the value & remove the colliding one from tiles state

          nextTile.value = 2 * nextTile.value; // FIXME: if last one touches end and there is no second one, do no double on that ocassion

          // TODO: now make it a single tile,
          // instead of two atop each other
          // just remove the one who was colliding
        }
        nextTile.x = nextCoordinates.x;
        nextTile.y = nextCoordinates.y;

        // TODO: if nextTile.value === 2048, win the game

        return nextTile;
      });

      const nextTilesWithoutAtopTiles = removeAtopTiles(nextTiles);
      return nextTilesWithoutAtopTiles;
    });

    // TODO: right after setting new tiles,
    // generate a new one with value of 2
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEvent);
    return () => {
      // cleanup
      window.removeEventListener("keydown", handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
