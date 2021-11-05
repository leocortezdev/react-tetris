export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
};

export const collisionDetection = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetrisBlock.length; y++) {
    for (let x = 0; x < player.tetrisBlock[0].length; x++) {
      // check to see if its a tetris block cell

      if (player.tetrisBlock[y][x] !== 0) {
        // make sure the move is legal within our stage's height or y axis
        // the block should not fall through the bottom
        if (
          !stage[y + player.pos.y + moveY] ||
          // check on the stage x axis the block is inside
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // cell should not be set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
