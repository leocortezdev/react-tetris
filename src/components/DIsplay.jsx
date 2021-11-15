import React from 'react'

import {StyledDisplay, TextArea} from './styles/StyledDisplay';

const Display = ({ gameOver, text, value}) => {
    return (
        <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
    )
}

export default Display
