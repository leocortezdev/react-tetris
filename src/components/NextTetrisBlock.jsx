import React from "react";

import Cell from "./Cell";

import {

  StyledNextTetrisBlock,
  StyledTitle,
  StyledWrapper
} from "./styles/StyledNextTetrisBlock";

const NextTetrisBlock = ({ tetrimino }) => (
  <StyledWrapper>
    <StyledTitle>Next</StyledTitle>
    <StyledNextTetrisBlock width={tetrimino[0].length} height={tetrimino.length}>
      <div className="tetromino">
        {tetrimino.map(row =>
          row.map((cell, x) => <Cell key={x} type={cell} />)
        )}
      </div>
    </StyledNextTetrisBlock>
  </StyledWrapper>
);

export default NextTetrisBlock;