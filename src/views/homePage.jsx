import React, { useState } from "react";
import { Grid } from "../components";
import { addToBoard } from "../apis";

export const HomePage = () => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  return (
    <>
      <Grid />

      <input type="number" value={x} onChange={(e) => setX(e.target.value)} />
      <input type="number" value={y} onChange={(e) => setY(e.target.value)} />

      <button
        onClick={() => {
          addToBoard({
            userName: "rami",
            userColor: "green",
            x: parseInt(x),
            y: parseInt(y),
          });
        }}
      >
        add cell
      </button>
    </>
  );
};
