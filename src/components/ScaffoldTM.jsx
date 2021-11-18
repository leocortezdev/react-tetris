import React, { useState, useEffect } from "react";

import { useController } from './hooks/useController';
import { StyledTetrisController } from './styles/StyledTetrisController';
import Tetris from './Tetris';



const TetrisController = () => {
    const [highscores, startGame, updateTetrisState, setHighscore, removePlayer, setStartGame, players] = useController(TetrisController);

    const onSubmitHighscore = newHighscoreArr => {
        sendDataToServer({
          type: "update-highscore",
          list: newHighscoreArr
        });
      };
    
      const sendDataToServer = data => {
        if (TetrisController.connectionManager) {
          TetrisController.connectionManager.send(data);
        }
      };
    
      return (
          <StyledTetrisController>
              {!startGame ? (
            <>Loading...</>
          ) : (
            [
              ...players.entries()
            ].map(([playerId, { events, isLocalPlayer, gameState }]) => (
              <Tetris
                key={playerId}
                events={events}
                isLocalPlayer={isLocalPlayer}
                gameState={gameState}
                highscores={highscores}
                handleHighscore={onSubmitHighscore}
                nPlayers={players.size}
              />
            ))
          )}
          </StyledTetrisController>
      )
};

export default TetrisController;
