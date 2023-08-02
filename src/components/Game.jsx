import { useState, useEffect } from "react";
import { ACCEPTED_KEYS, CELLS } from "../constants";
import {
  getInitialTiles,
  getRandomIntegerFromInterval,
  removeAtopTiles,
} from "../utils";
import { Tile } from "./Tile";
// TODO: TS
const TEST_TILES = [
  { value: 2, x: 0, y: 1 },
  { value: 4, x: 1, y: 1 },
  { value: 2, x: 3, y: 3 },
  { value: 4, x: 3, y: 2 },
];
const TEST_TILES_NEXT = [
  { value: 2, x: 0, y: 2 },
  { value: 4, x: 1, y: 2 },
  { value: 2, x: 1, y: 3 },
  { value: 4, x: 2, y: 2 },
];
const Game = () => {
  const [tiles, setTiles] = useState(getInitialTiles());
  const [state, setState] = useState(false);
  const [win, setWin] = useState(false);
  const [lost, setLose] = useState(false);
  const [isSettingNewTile, setSettingNewTile] = useState(false);
  const [winScore, setWinScore] = useState(0);
  const [lostScore, setLoseScore] = useState(0);

  useEffect(() => {
    const found = tiles.find((tile) => tile.value === 2048);
    if (found) {
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

  useEffect(() => {
    if (lost) {
      window.removeEventListener("keydown", handleEvent);
      return;
    }
    window.addEventListener("keydown", handleEvent);
    return () => {
      // cleanup
      window.removeEventListener("keydown", handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lost]);

  useEffect(() => {
    if (isSettingNewTile) {
      const emptyCells = [];

      // get only empty cells:
      CELLS.forEach((cell) => {
        const found = tiles.find((tile) => {
          return tile.x === cell.x && tile.y === cell.y;
        });

        if (!found) emptyCells.push(cell);
      });

      if (emptyCells.length === 0) {
        setLose(true);
        let score = 0;
        tiles.forEach((tile) => (score += tile.value));
        setLoseScore(score);
        return;
      }

      const randomIndex = getRandomIntegerFromInterval(
        0,
        emptyCells.length - 1
      );

      // push a new tile:
      setTiles((currentTiles) => {
        const nextTiles = [
          ...currentTiles,
          {
            value: 2,
            x: emptyCells[randomIndex].x,
            y: emptyCells[randomIndex].y,
          },
        ];
        return nextTiles;
      });

      setSettingNewTile(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettingNewTile]);

  const getTileNeighbor = (tileOrigin, allTiles, direction) => {
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

  const canMoveInDirection = (tile, allTiles, direction) => {
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
    // tile.value === 4 &&
    //   tile.y === 1 &&
    //   console.log("has tile neighbor in the north? ", neighbor);
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

  const getNextTile = ({ currentTile, direction, canMerge }) => {
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

  // type Keys = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
  const handleEvent = ({ key: direction }) => {
    const found = ACCEPTED_KEYS.find(
      (accepted_key) => direction === accepted_key
    );

    // unsupported key:
    if (!found) return;

    setTiles((currentTiles) => {
      const nextTiles = currentTiles.map((currentTile) => {
        const { canMove, canMerge } = canMoveInDirection(
          currentTile,
          currentTiles,
          direction
        );

        if (!canMove) {
          // tile can not move, return it as it is:
          return currentTile;
        }

        // tile can move, udpate its coordinates & value:
        const nextTile = getNextTile({
          currentTile,
          direction,
          canMerge,
        });

        return nextTile;
      });

      // remove atop tiles (tiles duplicity created by the merge)
      const nextTilesWithoutAtopTiles = removeAtopTiles(nextTiles);
      return nextTilesWithoutAtopTiles;
    });

    // generate a new tile:
    setSettingNewTile(true);
  };

  return (
    <>
      <div className={`${state ? "jo" : "ne"}`}>hello TODO: rm</div>

      <button onClick={() => setTiles(TEST_TILES_NEXT)}>click</button>
      {win && (
        <div className="endgame win">
          <h1>You have won the game!</h1>
          <h2>Your score: {winScore}</h2>
        </div>
      )}

      {lost && (
        <div className="endgame lost">
          <h1>You have lost the game!</h1>
          <h2>Your score: {lostScore}</h2>
        </div>
      )}

      <div className="grid">
        {/* CELLS */}
        {CELLS.map((cell, idx) => {
          return (
            <div key={`${cell.y}-${cell.x}-${idx}`} className="cell"></div>
          );
        })}

        {/* TILES */}
        {tiles.map((tile, idx) => {
          return <Tile key={`${tile.y}-${tile.x}-${idx}`} tile={tile} />;
        })}
      </div>
    </>
  );
};

export default Game;
