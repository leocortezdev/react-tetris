import React from "react";

import { StyledHighscore, PlayerScore } from "./styles/StyledHighscore";

const HighScore = ({ highScores }) => {
  return (
    <StyledHighscore>
      <h4 className="title">Highscores</h4>
      {console.log(highScores)}
      {highScores.length !== 0
        ? highScores.sort((a, b) => b.score - a.score).map((highscore, i) => (
            <PlayerScore key={i}>
              <span className="name">{highscore.name}</span>
              <span className="score">{highscore.score}</span>
            </PlayerScore>
          ))
        : <p>Loading...</p>}
    </StyledHighscore>
  );
};

export default React.memo(HighScore);