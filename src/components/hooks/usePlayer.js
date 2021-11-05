import { useState, useCallback } from "react";

import { randomTetrisBlocks, TETRIS_BLOCKS } from "../logic/tetrisBlocks";
import { STAGE_WIDTH } from "./../logic/gameHelper";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetrisBlock: TETRIS_BLOCKS[0].shape,
    collided: false,
  });

  const rotate = (tetrisBlock, dir) => {
    // transpose the tetris block => rows into cols
    const rotatedTetris = tetrisBlock.map((_, index) =>
      tetrisBlock.map((col) => col[index])
    );

    // reverse rows to full rotate tetris blocks
    if (dir > 0) return rotatedTetris.map((row) => row.reverse());
    return rotatedTetris.reverse();
  };

  const playerRotate = (stage, dir) => {
      const copiedPlayer = JSON.parse(JSON.stringify(player));
      copiedPlayer.tetrisBlock = rotate(copiedPlayer.tetrisBlock, dir);
      
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetrisBlock: randomTetrisBlocks().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};
