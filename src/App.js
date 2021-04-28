import React, { useEffect, useState } from "react";
import GameScreen from "./components/GameScreen";
import "./App.css";

function App() {
  const [renderGameOver, setRenderGameOver] = useState(false);
  const [renderGame, setRenderGame] = useState(true);
  const [score, setScore] = useState();
  const [start, setStart] = useState(false);

  const onStart = () => {
    const startBtn = document.getElementById("start-btn");
    startBtn.classList.add("start-btn-hidden");
    setStart(true);
  };

  const onPlayAgain = () => {
    const startBtn = document.getElementById("start-btn");
    startBtn.classList.remove("start-btn-hidden");
    setRenderGameOver(false);
    setRenderGame(true);
  };
  const displayGameOver = (gameOver, score) => {
    if (gameOver) {
      console.log(`GAme OVer ${score} `);
      setRenderGameOver(true);
      setScore(score);
      setRenderGame(false);
    }
  };

  return (
    <div className="App">
      {renderGameOver ? (
        <div id="game-over-display">
          <h1>Game over</h1>
          <h2>Your final score was {score}</h2>
          <button id="play-again-btn" onClick={onPlayAgain}>
            Play Again
          </button>
        </div>
      ) : null}
      <button id="start-btn" className="start-btn " onClick={onStart}>
        Start
      </button>

      {renderGame ? (
        <GameScreen stopGame={displayGameOver} startGame={start} />
      ) : null}
    </div>
  );
}

export default App;
