import { useState } from 'react';
import {createStage} from '../logic/gameHelper';

export const useStage = () => {
    const [stage, setStage] = useState(createStage());

    return [stage, setStage];
}