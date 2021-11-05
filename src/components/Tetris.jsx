import React, { useState } from "react";

// helper functions

import { createStage } from "./logic/gameHelper";

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

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log("re-render");

  const movePlayer = (dir) => {
    updatePlayerPos({x: dir, y: 0});
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false})
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
          <StartButton onClick={startGame}/>
        </aside>
      </StyledTetrisArea>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
