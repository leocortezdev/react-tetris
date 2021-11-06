import React, { useState } from "react";

// helper functions

import { createStage, collisionDetection } from "./logic/gameHelper";

//components

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Custom Hooks

import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";

// style components

import { StyledTetrisWrapper, StyledTetrisArea } from "./styles/StyledTetris";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("re-render");

  const movePlayer = (dir) => {
    if (!collisionDetection(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
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

  const dropPlayer = () => {
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

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetrisArea>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score:" />
              <Display text="Rows:" />
              <Display text="Level:" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetrisArea>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
