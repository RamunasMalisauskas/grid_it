import React, { useState } from "react";
import { Grid } from "../components";
import { addToBoard } from "../apis";

export const HomePage = () => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [data, setData] = useState();
  const randomColor = require("randomcolor");

  return (
    <>
      <Grid />

      <input type="number" value={x} onChange={(e) => setX(e.target.value)} />
      <input type="number" value={y} onChange={(e) => setY(e.target.value)} />
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <button
        onClick={() => {
          addToBoard({
            userName: "rami",
            userColor: randomColor(),
            x: parseInt(x),
            y: parseInt(y),
            data: { text: data },
          });
        }}
      >
        add cell
      </button>
    </>
  );
};
