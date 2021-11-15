import React from "react";

import { StyledTetrisController } from "./styles/StyledTetrisController";
import Tetris from "./Tetris";

const TetrisController = () => {
  return (
    <StyledTetrisController>
      <Tetris />
    </StyledTetrisController>
  );
};

export default TetrisController;
