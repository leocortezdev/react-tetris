import React, { useState, useEffect, useCallback } from "react";
import { StyledTetrisController } from "./styles/StyledTetrisController";
import  Connections  from "./logic/connections";
import  EventHandler  from "./logic/eventHandler";
import Tetris from "./Tetris";

const TetrisController = () => {
  //const [players, setPlayers] = useState(new Map());
  const [players, setPlayers] = useState(new Map());
  const [highscores, setHighScores] = useState([]);
  const [startGame, setStartGame] = useState(true);

  //const testPlayers = {};

  const createPlayer = useCallback(
    (playerId = "localPlayer", gameState = {}) => {
      const events = new EventHandler();
      const isLocalPlayer = players.size === 0 ? true : false;
      setPlayers((prev) =>
        prev.set(playerId, { events, isLocalPlayer, gameState })
      );
    },
    [players]
  );

  useEffect(() => {
    createPlayer();
    const connectionManager = new Connections(TetrisController);
    connectionManager.connect("ws://localhost:3000");
    //connectionManager.connect("future connection");
  }, [createPlayer]);

  const setHighscore = (newHighscore) =>
    setHighScores([...highscores, newHighscore]);

  const updateTetrisState = (id, newState) => {
    const player = players.get(id);

    player.gameState = {
      ...player.gameState,
      [newState.prop]: newState.value,
    };

    setPlayers((prev) => prev.set(id, player));
  };

  const removePlayer = (id) => {
    setPlayers((prev) => prev.delete(id));
  };

  const onSubmitHighscore = (newHighscoreArr) => {
    sendDataToServer({
      type: "update-highscore",
      list: newHighscoreArr,
    });
  };

  const sendDataToServer = (data) => {
    if (TetrisController.connectionManager) {
      TetrisController.connectionManager.send(data);
    }
  };

  return (
    <StyledTetrisController>
      {[...players.entries()].map(
        ([playerId, { events, isLocalPlayer, gameState }]) => (
          <Tetris
            key={playerId}
            events={events}
            isLocalPlayer={isLocalPlayer}
            gameState={gameState}
            highscores={highscores}
            handleHighscore={onSubmitHighscore}
            nPlayers={players.size}
          />
        )
      )}
    </StyledTetrisController>
  );
};

export default TetrisController;
