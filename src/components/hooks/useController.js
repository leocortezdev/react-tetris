import{ useState, useEffect, useCallback } from "react";

import Connections from "../logic/connections";
import {EventHandler}  from "../logic/eventHandler";


export const useController = (TetrisController) => {

  const [players, setPlayers] = useState(new Map());
  const [highscores, setHighScores] = useState([]);
  const [startGame, setStartGame] = useState(true);

  //const testPlayers = {};

  const createPlayer = useCallback((playerId = "localPlayer", gameState = {}) => {
    const events = new EventHandler();
    const isLocalPlayer = players.size === 0 ? true : false;
    setPlayers((prev) =>
      prev.set(playerId, { events, isLocalPlayer, gameState })
    );
}, [players]);

  useEffect(() => {
    createPlayer();
    const connectionManager = new Connections(TetrisController);
    connectionManager.connect("ws://localhost:3000");
    //connectionManager.connect("future connection");
    return connectionManager;
  }, [createPlayer, TetrisController]);

  const setHighscore = newHighscore => setHighScores([...highscores, newHighscore]);

  const updateTetrisState = (id, newState) => {
    const player = players.get(id);

    player.gameState = {
      ...player.gameState,
      [newState.prop]: newState.value,
    };

    setPlayers((prev) => prev.set(id, player));
  };

  const removePlayer = id => {
    setPlayers(prev => prev.delete(id));
  };

  return [highscores, startGame, updateTetrisState, setHighscore, removePlayer, setStartGame, players];
};
