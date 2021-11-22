import React, { useState, useEffect } from "react";

// helper functions

import { createStage, collisionDetection } from "./logic/gameHelper";

//components

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import HighScore from "./HighScore";

// Custom Hooks
import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";
import { useGameStatus } from "./hooks/useGameStatus";

// style components

import { StyledTetrisWrapper, StyledTetrisArea } from "./styles/StyledTetris";
import NextTetrisBlock from "./NextTetrisBlock";

const Tetris = ({ key, events, isLocalPlayer, gameState, highscores, handleHighscore, nPlayers }) => {
  const baseSpeed = 700;
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(baseSpeed);
  const [showModal, setShowModal] = useState(false);
  const [speedDrop, setSpeedDrop] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate, nextBlock] =
    usePlayer();

  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
  const username = "null";
  console.log("re-render");

  /*const fakeHighScores = [
    { name: "leo", score: 2223 },
    { name: "leo", score: 223323 },
  ];
  */


  useEffect(() => {
    if (!isLocalPlayer) {
      const stage = gameState.stage;
      if (stage) setStage(stage);
    }
  }, [gameState.stage, isLocalPlayer, setStage]);

  useEffect(() => {
    if (!isLocalPlayer) {
      if (gameState.gameOver !== undefined) setGameOver(gameState.gameOver);
      if (gameState.score !== undefined) setScore(gameState.score);
      if (gameState.rows !== undefined) setRows(gameState.rows);
      if (gameState.level !== undefined) setLevel(gameState.level);
    }
  }, [
    gameState,
    isLocalPlayer,
    setScore,
    setRows,
    setLevel
  ]);

  useEffect(() => {
    const serializeGameState = () => {
      return { stage, gameOver, score, rows, level };
    }
    // for every player that joins the session
    // broadcast our local state to all clients
    if (isLocalPlayer && nPlayers > 1) {
      const state = serializeGameState();
      events.emit("state", state);
    }
  }, [nPlayers, events, isLocalPlayer, stage, gameOver, score, rows, level]);

  const movePlayer = (dir) => {
    if (!collisionDetection(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  
  useEffect(() => {
    events.emit("score", score);
  }, [events, score]);

  useEffect(() => {
    events.emit("rows", rows);
  }, [events, rows]);

  useEffect(() => {
    events.emit("level", level);
  }, [events, level]);

  useEffect(() => {
    events.emit("gameOver", gameOver);
  }, [events, gameOver]);

  useEffect(() => {
    events.emit("player", player);
  }, [events, player]);

  useEffect(() => {
    events.emit("stage", stage);
  }, [events, stage]);

  useInterval(() => {
    drop();
  }, dropTime);

  const startGame = () => {
    setStage(createStage());
    setGameSpeed(isLocalPlayer ? baseSpeed : null);
    setDropTime(baseSpeed);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    // calculate level when player rows > 10
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!collisionDetection(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // update on game over
      if (player.pos.y < 1) {
        console.log("game over");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });

      if (
        highscores.length < 5 ||
        highscores.slice(0, 5).find(highscore => score > highscore.score)
      ) {
        setShowModal(true); // show highscore submit modal
      }
    }
  };

  const keyUp = ({ key }) => {
    if (!gameOver) {
      if (key === "ArrowDown" || key === "s") {
        //check to see interval is on
        console.log("interval is on");
        setSpeedDrop(false);
        setDropTime(1000);
      }
    }
  };

  

  const dropPlayer = () => {
    //check to see if interval is off
    console.log("interval is off");
    setDropTime(null);
    drop();
  };

  const onSubmitHighscore = name => {
    setShowModal(false);
    const highscoreItem = { name, score };
    const newHighscoreArr = [...highscores, highscoreItem];
    newHighscoreArr.sort((a, b) => b.score - a.score);
    if (newHighscoreArr.length > 5) newHighscoreArr.pop();

    handleHighscore(newHighscoreArr);
  };

  const move = ({ key }) => {
    if (!gameOver) {
      if (key === "ArrowLeft" || key === "a") {
        movePlayer(-1);
      } else if (key === "ArrowRight" || key === "d") {
        movePlayer(1);
      } else if (key === "ArrowDown" || key === "s") {
        dropPlayer();
      } else if (key === "q") {
        playerRotate(stage, -1);
      } else if (key === "e") {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  

  return (
    <StyledTetrisWrapper
      key={key}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetrisArea>
        <aside className="next-tetrisBlock">
          <>
            <NextTetrisBlock tetrisBlock={nextBlock} />
            <HighScore highScores={highscores} />
          </>
        </aside>
        <Stage stage={stage} className="stage" />
        {showModal ? <HighScore submitName={onSubmitHighscore} /> : null}
        <aside className="information">

          {gameOver ? (
            <>
              <Display text={`User: ${username}`} />
              <Display gameOver={gameOver} text="Game Over" />
            </>
          ) : (
            <>
              <Display text={`User: ${username}`} />
              <Display text={`Score: ${score}`} />
              <Display text={`Row: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetrisArea>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
