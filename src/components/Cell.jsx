import React from 'react'
import { StyledCell } from './styles/StyledCell';
import { TETRIS_BLOCKS } from './logic/tetrisBlocks';

const Cell = ({type}) => {
    return (
        <StyledCell type={type} color={TETRIS_BLOCKS[type].color}></StyledCell>
    )
}

export default Cell
