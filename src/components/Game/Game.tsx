import { useState, useEffect } from "react";
import { ACCEPTED_KEYS, CELLS, END_GAME } from "../../constants";
import type { AcceptedKey } from "../../types";
import {
  canMoveInDirection,
  getInitialTiles,
  getNextTile,
  getRandomIntegerFromInterval,
  removeAtopTiles,
} from "../../utils";
import { Tile } from "../Tile/Tile";
import type { Coordinate } from "../../types";

const Game = () => {
  const [tiles, setTiles] = useState(getInitialTiles());
  const [win, setWin] = useState(false);
  const [lost, setLose] = useState(false);
  const [score, setScore] = useState(0);
  const [isSettingNewTile, setSettingNewTile] = useState(false);

  useEffect(() => {
    const found = tiles.find((tile) => tile.value === END_GAME);
    if (found) {
      setWin(true);
      let score = 0;
      tiles.forEach((tile) => (score += tile.value));
      setScore(score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles]);

  useEffect(() => {
    if (win || lost) {
      window.removeEventListener("keydown", handleEvent);
      return;
    }
    window.addEventListener("keydown", handleEvent);
    return () => {
      // cleanup
      window.removeEventListener("keydown", handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win, lost]);

  useEffect(() => {
    if (isSettingNewTile) {
      const emptyCells: Array<Coordinate> = [];

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
        setScore(score);
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

  const startGame = () => {
    // start a new game sequence:
    setScore(0);
    setWin(false);
    setLose(false);
    const newTiles = getInitialTiles();
    setTiles(newTiles);
  };

  const handleEvent = (event: KeyboardEvent) => {
    const direction = event.key as AcceptedKey;

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
      {win && (
        <div className="endgame win">
          <h1>You have won the game!</h1>
          <h2>Your score: {score}</h2>
        </div>
      )}

      {lost && (
        <div className="endgame lost">
          <h1>You have lost the game!</h1>
          <h2>Your score: {score}</h2>
        </div>
      )}

      <button className="btn-new-game" onClick={startGame}>
        Start a new game
      </button>

      <div className="grid">
        {/* CELLS */}
        {CELLS.map((_cell, idx) => {
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
