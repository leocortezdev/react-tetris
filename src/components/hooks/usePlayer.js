import { useState } from "react";

import { randomTetrisBlocks } from "../logic/tetrisBlocks";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos:{x: 0, y: 0},
        tetrisBlock: randomTetrisBlocks().shape,
        collided: false,
    });

    return [player];
}