import { useState, useEffect } from "react";
import { ACCEPTED_KEYS, CELLS, TILES_INITIAL } from "../constants";
import { Tile } from "./Tile";

// TODO: TS
// TODO: func get random tile with value 2 to available position

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

        if (direction === "ArrowRight") {
          let nextCoordinates = {
            x: nextTile.x === 3 ? 3 : nextTile.x + 1,
            y: nextTile.y,
          };

          const collidingTile = getCollidingTile(
            nextCoordinates,
            prev,
            direction
          );

          if (collidingTile && nextTile.value === collidingTile.value) {
            console.log("___ merge & sum two tiles onto next position: ");
            console.log("___ tile that moves: ", prevTile);
            console.log("___ collidingTile: ", collidingTile);

            nextTile.value = 2 * nextTile.value;
            // make it a single tile, instead of two atop each other
          }
          nextTile.x = nextCoordinates.x;
          nextTile.y = nextCoordinates.y;
        }
        if (direction === "ArrowUp") {
          nextTile.y = nextTile.y === 0 ? 0 : nextTile.y - 1;
        }
        if (direction === "ArrowLeft") {
          nextTile.x = nextTile.x === 0 ? 0 : nextTile.x - 1;
        }
        if (direction === "ArrowDown") {
          nextTile.y = nextTile.y === 3 ? 3 : nextTile.y + 1;
        }
        return nextTile;
      });

      return nextTiles;
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
