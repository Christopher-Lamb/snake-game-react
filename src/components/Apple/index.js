import React, { useEffect, useRef, useState } from "react";
import "./Apple.css";

function Apple({ x, y }) {
  return (
    <div className="apple" style={{ top: `${y}px`, left: `${x}px` }}></div>
  );
}

export default Apple;
