import React, { useState } from "react";

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

  const [player] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log("re-render");

  return (
    <StyledTetrisWrapper>
      <StyledTetrisArea>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text="Score:" />
              <Display text="Rows:" />
              <Display text="Level:" />
            </div>
          )}
          <StartButton />
        </aside>
      </StyledTetrisArea>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
