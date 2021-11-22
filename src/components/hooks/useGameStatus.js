import {useState, useEffect, useCallback} from 'react';



export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);
  
  
  const calcScore = useCallback(() => {
    const scorePoints = [40, 100, 300, 1200];
    if (rowsCleared > 0) {
      setScore(
        prev =>
          prev + scorePoints[rowsCleared > 4 ? 3 : rowsCleared - 1] * level
      );
      setRows(prev => prev + rowsCleared)
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
