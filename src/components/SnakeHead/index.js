import React from "react";
import { useState, useEffect, useRef } from "react";
import SnakeBody from "../SnakeBody";
import Apple from "../Apple";

import "./SnakeHead.css";

function SnakeHead({ bodyLength, start, snakeInfo }) {
  // Call our hook for each key that we'd like to monitor
  const xCoordinate = useRef(1);
  const yCoordinate = useRef(1);
  const prevPositionsRef = useRef([{ xCoord: 1, yCoord: 1 }]);
  const [stop, setStop] = useState(false);

  const [left, setLeft] = useState(false);
  const [up, setUp] = useState(false);
  const [right, setRight] = useState(false);
  const [down, setDown] = useState(false);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    //init positions
    snakeInfo(prevPositionsRef.current, stop);
  }, []);

  useEffect(() => {
    //init positions
    snakeInfo(prevPositionsRef.current, stop);
  }, [stop]);

  useEffect(() => {
    if (start) {
      //Wall Barriers
      const interval = setInterval(() => {
        // console.log(start);
        // console.log("HEy");

        //If snake Crosses Border Stop Him
        if (xCoordinate.current <= 0 || xCoordinate.current >= 450) {
          clearInterval(interval);
          setStop(true);
        }
        if (yCoordinate.current <= 0 || yCoordinate.current >= 450) {
          clearInterval(interval);
          setStop(true);
          start = false;
        }

        //If snake Hits its own body Stop Him

        for (let i = 1; i < prevPositionsRef.current.length; i++) {
          if (
            prevPositionsRef.current[i].xCoord === xCoordinate.current &&
            prevPositionsRef.current[i].yCoord === yCoordinate.current
          ) {
            setStop(true);
            clearInterval(interval);
          }
        }

        //Export Positions
        snakeInfo(prevPositionsRef.current, stop);

        if (left) {
          xCoordinate.current = xCoordinate.current - 15;
        } else if (right) {
          xCoordinate.current = xCoordinate.current + 15;
        } else if (up) {
          yCoordinate.current = yCoordinate.current - 15;
        } else if (down) {
          yCoordinate.current = yCoordinate.current + 15;
        } else {
          console.log("hit the else block");
        }

        prevPositionsRef.current = [
          {
            xCoord: xCoordinate.current,
            yCoord: yCoordinate.current,
          },
          ...prevPositionsRef.current,
        ];
        if (prevPositionsRef.current.length > bodyLength) {
          prevPositionsRef.current.length = bodyLength;
        }
      }, 65);
      return () => clearInterval(interval);
    }
  }, [up, down, left, right]);

  //Handle Moving Snake Head Left
  const directionLeft = () => {
    if (stop) {
      return;
    }
    if (!right && start) {
      setLeft(true);
      setRight(false);
      setUp(false);
      setDown(false);
    }
  };

  //Handle Moving Snake Head Right
  const directionRight = () => {
    if (stop) {
      return;
    }
    if (!left && start) {
      setLeft(false);
      setRight(true);
      setUp(false);
      setDown(false);
    }
  };
  //Handle Moving Snake Head Right
  const directionUp = () => {
    if (stop) {
      return;
    }
    if (!down && start) {
      setLeft(false);
      setRight(false);
      setUp(true);
      setDown(false);
    }
  };

  //Handle Moving Snake Head Right
  const directionDown = () => {
    if (stop) {
      return;
    }
    if (!up && start) {
      setLeft(false);
      setRight(false);
      setUp(false);
      setDown(true);
    }
  };

  //Use useKey hook to track user key presses

  useKey("KeyA", directionLeft);
  useKey("KeyW", directionUp);
  useKey("KeyD", directionRight);
  useKey("KeyS", directionDown);

  return (
    <>
      <div
        id="snake-head"
        style={{
          top: `${yCoordinate.current}px`,
          left: `${xCoordinate.current}px`,
        }}
      >
        <h1 style={{ color: "white" }}></h1>
      </div>
      {prevPositionsRef.current.map((coords, i) => {
        return <SnakeBody key={i} coords={coords} />;
      })}
    </>
  );
}

//Hook for key and Callback Function
function useKey(key, cb) {
  //Init Ref for callback
  const callbackRef = useRef(cb);
  //Tracks the current Callback
  useEffect(() => {
    callbackRef.current = cb;
  });

  //Inits each handle with the current running function
  useEffect(() => {
    function handle(event) {
      if (event.code === key) {
        callbackRef.current(event);
      }
    }
    //Adds then removes eventListener
    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
}

export default SnakeHead;
