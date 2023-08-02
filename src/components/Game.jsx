import { useState, useEffect } from "react";
import { ACCEPTED_KEYS, CELLS, TILES_INITIAL } from "../constants";
import {
  canDoubleTheValue,
  getCollidingTile,
  getRandomIntegerFromInterval,
  removeAtopTiles,
} from "../utils";
import { Tile } from "./Tile";
// TODO: TS

const Game = () => {
  const [tiles, setTiles] = useState(TILES_INITIAL);
  const [win, setWin] = useState(false);
  const [winScore, setWinScore] = useState(0);

  useEffect(() => {
    const found = tiles.find((tile) => tile.value === 2048);
    if (found) {
      window.removeEventListener("keydown", handleEvent);
      setWin(true);

      let score = 0;
      tiles.forEach((tile) => (score += tile.value));
      setWinScore(score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles]);

  useEffect(() => {
    if (win) {
      window.removeEventListener("keydown", handleEvent);
      return;
    }
    window.addEventListener("keydown", handleEvent);
    return () => {
      // cleanup
      window.removeEventListener("keydown", handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win]);

  // const Keys = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
  const handleEvent = ({ key: direction }) => {
    const found = ACCEPTED_KEYS.find(
      (accepted_key) => direction === accepted_key
    );

    // unsupported key:
    if (!found) return;

    setTiles((prev) => {
      const nextTiles = prev.map((prevTile) => {
        let nextTile = Object.assign({}, prevTile);
        let nextCoordinates = {
          x: null,
          y: null,
        };

        // get next coordinates for each tile:
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

        // check if colliding with another tile:
        const collidingTile = getCollidingTile(
          nextCoordinates,
          prev,
          direction
        );
        console.log("___ current moving tile: ", prevTile);
        console.log("___ his next coordinates: ", nextCoordinates);
        console.log("___ is there a colliding tile?: ", collidingTile);

        // move tile to next cell:
        nextTile.x = nextCoordinates.x;
        nextTile.y = nextCoordinates.y;

        if (collidingTile && nextTile.value === collidingTile.value) {
          // FIXME: if (canDoubleTheValue(prevTile, nextTile)) {
          // merge two tiles into one by doubling the value
          nextTile.value = 2 * nextTile.value;
          //}
        }

        // FIXME: if nextTile.value === 2048
        // finish the iteration & callback winGame()
        return nextTile;
      });

      // remove atop tiles (tiles duplicity created by the merge)
      const nextTilesWithoutAtopTiles = removeAtopTiles(nextTiles);
      return nextTilesWithoutAtopTiles;
    });

    // generate a new tile:
    setNewTile();
  };

  const setNewTile = () => {
    const emptyCells = [];

    // get only empty cells:
    CELLS.forEach((cell) => {
      const found = tiles.find((tile) => {
        return tile.x === cell.x && tile.y === cell.y;
      });

      if (!found) emptyCells.push(cell);
    });

    if (emptyCells.length === 0) {
      console.info("___ no new tiles possible, game should have ended by now");
      return;
    }

    const randomIndex = getRandomIntegerFromInterval(0, emptyCells.length - 1);

    // push a new tile:
    setTiles((prev) => {
      const nextTiles = [
        ...prev,
        {
          value: 2,
          x: emptyCells[randomIndex].x,
          y: emptyCells[randomIndex].y,
        },
      ];
      return nextTiles;
    });
  };

  return (
    <>
      {win && (
        <div className="win">
          <h1>You have win the game!</h1>
          <h2>Your score: {winScore}</h2>
        </div>
      )}

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
