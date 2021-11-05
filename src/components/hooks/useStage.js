import { useState, useEffect } from "react";
import { createStage } from "../logic/gameHelper";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prevStage) => {
      // clean the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );
        // after draw the tetrisBlock 

        player.tetrisBlock.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value !== 0) {
                    newStage[y + player.pos.y][x + player.pos.x] = [
                        value,
                        `${player.collided ? 'merged' : 'clear'}`
                    ]
                }
            })
        })
        // check for collision
        if(player.collided) {
            resetPlayer();
        }

        return newStage
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage];
};
