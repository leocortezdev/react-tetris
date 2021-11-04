import React from 'react'

//styles

import { StyledStartButton } from './styles/StyledStartButton'

const StartButton = ({ callback }) => {
    return (
        <StyledStartButton onClick={callback}>
            Start Game
        </StyledStartButton>
    )
}

export default StartButton
