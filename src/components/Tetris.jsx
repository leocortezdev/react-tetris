import React, { useState } from "react";

// helper functions

import { createStage, collisionDetection } from "./logic/gameHelper";

//components

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Custom Hooks
import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";
import { useGameStatus} from './hooks/useGameStatus';

// style components

import { StyledTetrisWrapper, StyledTetrisArea } from "./styles/StyledTetris";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();

  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  console.log("re-render");

  const movePlayer = (dir) => {
    if (!collisionDetection(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setDropTime(1000);
    setStage(createStage());
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0)
    setGameOver(false);
  };

  const drop = () => {
    // calculate level when player rows > 10
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!collisionDetection(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // update on game over
      if (player.pos.y < 1) {
        console.log("game over");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ key }) => {
    if (!gameOver) {
      if (key === "ArrowDown" || key === "s") {
        //check to see interval is on
        console.log('interval is on');
        setDropTime(1000);
      }
    }
  };

  const dropPlayer = () => {
    //check to see if interval is off
    console.log('interval is off');
    setDropTime(null);
    drop();
  };

  const move = ({ key }) => {
    if (!gameOver) {
      if (key === "ArrowLeft" || key === "a") {
        movePlayer(-1);
      } else if (key === "ArrowRight" || key === "d") {
        movePlayer(1);
      } else if (key === "ArrowDown" || key === "s") {
        dropPlayer();
      } else if (key === "q") {
        playerRotate(stage, -1);
      } else if (key === "e") {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetrisArea>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Row: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetrisArea>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
