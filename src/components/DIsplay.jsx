import React from 'react'

import {StyledDisplay, TextArea} from './styles/StyledDisplay';

const Display = ({ gameOver, text, value}) => {
    return (
        <StyledDisplay gameOver={gameOver}>
            <TextArea >
                {text}
            </TextArea>
            <TextArea >
                {value}
            </TextArea>
        </StyledDisplay>
    )
}

export default Display
