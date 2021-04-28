import React from "react";
import "./SnakeBody.css";

function SnakeBody({ coords}) {
  return (
    <div
      className="snake-body"
      style={{
        top: `${coords.yCoord}px`,
        left: `${coords.xCoord}px`,
      }}
    ></div>
  );
}

export default SnakeBody;
