import React, { useState, useEffect, useRef } from "react";
import Apple from "../Apple";
import SnakeHead from "../SnakeHead";

import "./GameScreen.css";

function GameScreen({ stopGame, startGame }) {
  const [start, setStart] = useState(false);
  const [snakeAlive, setSnakeAlive] = useState(true);

  const [snakePositions, setSnakePositions] = useState();
  const bodyLength = useRef(1);
  const getRandCoord = () => {
    let num = 15 * Math.floor(Math.random() * 29 + 1) + 1;
    return num;
  };
  const x = useRef(getRandCoord());
  const y = useRef(getRandCoord());

  useEffect(() => {
    setStart(startGame);

    if (start) {
      const interval = setInterval(() => {
        //If snake head occupies Apple's Space spawn new apple increase body length
        if (
          snakePositions[0].xCoord === x.current &&
          snakePositions[0].yCoord === y.current
        ) {
          x.current = getRandCoord();
          y.current = getRandCoord();
          bodyLength.current = bodyLength.current + 1;
        }

        //If Apple tries to spawn on a Snake body randomized Coordinates of Apple
        for (let i = 1; i < snakePositions.length; i++) {
          if (
            snakePositions[i].xCoord === x.current &&
            snakePositions[i].yCoord === y.current
          ) {
            x.current = getRandCoord();
            y.current = getRandCoord();
          }
        }
      }, 50);
      return () => clearInterval(interval);
    }
  });

  const setSnakeInfo = (positions, stop) => {
    setSnakePositions(positions);
    if (stop) {
      stopGame(true, bodyLength.current - 1);
    }
  };

  return (
    <div id="game-screen">
      <h1 id="score-count">Score: {bodyLength.current - 1}</h1>

      <SnakeHead
        bodyLength={bodyLength.current}
        start={start}
        snakeInfo={setSnakeInfo}
      />

      <Apple x={x.current} y={y.current} />
    </div>
  );
}

export default GameScreen;
