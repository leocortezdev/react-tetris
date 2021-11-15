import React from "react";

import Cell from "./Cell";

import {

  StyledNextTetrisBlock,
  StyledTitle,
  StyledWrapper
} from "./styles/StyledNextTetrisBlock";

const NextTetrisBlock = ({ tetrisBlock }) => (
  <StyledWrapper>
    <StyledTitle>Next</StyledTitle>
    <StyledNextTetrisBlock width={tetrisBlock[0].length} height={tetrisBlock.length}>
      <div className="tetrisBlock">
        {tetrisBlock.map(row =>
          row.map((cell, x) => <Cell key={x} type={cell} />)
        )}
      </div>
    </StyledNextTetrisBlock>
  </StyledWrapper>
);

export default NextTetrisBlock;