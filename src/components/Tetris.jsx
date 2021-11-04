import React from "react";

//components

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// helper functions

import { createStage } from "./logic/gameHelper";

// style components

import { StyledTetrisWrapper, StyledTetrisArea } from "./styles/StyledTetris";

const Tetris = () => {
  return (
    <StyledTetrisWrapper>
        <StyledTetrisArea>
      <Stage stage={createStage()}/>
      <aside>
        <div>
          <Display text="Score:" />
          <Display text="Rows:" />
          <Display text="Level:" />
        </div>
        <StartButton />
      </aside>
      </StyledTetrisArea>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
