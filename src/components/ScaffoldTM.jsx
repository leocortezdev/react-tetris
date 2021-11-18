import React, { useState, useEffect } from "react";

import { useController } from './hooks/useController';


const TetrisController = () => {
    const [highscores, startGame, updateTetrisState] = useController(TetrisController);

    const onSubmitHighscore = newHighscoreArr => {
        TetrisController.sendDataToServer({
          type: "update-highscore",
          list: newHighscoreArr
        });
      };
    
      const sendDataToServer = data => {
        if (TetrisController.connectionManager) {
          TetrisController.connectionManager.send(data);
        }
      };
    
};

export default TetrisController;
