import React, { useState } from "react";
import { Grid } from "../components";
import { addToBoard } from "../apis";

type StageType = string

export const HomePage: React.FC = () => {
  const [x, setX] = useState<StageType>("");
  const [y, setY] = useState<StageType>("");
  const [data, setData] = useState<StageType>("");
  const randomColor = require("randomcolor");

  return (
    <>
      <Grid />

      <input type="number" value={x} onChange={(e): void => setX(e.target.value)} />
      <input type="number" value={y} onChange={(e): void => setY(e.target.value)} />
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
