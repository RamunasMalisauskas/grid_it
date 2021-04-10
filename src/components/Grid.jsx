import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { addToBoard } from "../apis/post";

//  rethink data visualisation/ position on canvas (top left rigth bottom)
export const Grid = () => {
  const boardData = useSelector((state) => state.userData.canvasData);
  const randomColor = require("randomcolor");

  return (
    <Canvas>
      {boardData &&
        boardData.map((cell) => (
          <Cell
            key={cell._id}
            onClick={() => {
              let color = randomColor();
              addToBoard({
                userName: cell.data.name,
                userColor: color,
                x: cell.x,
                y: cell.y,
              });
            }}
            left={cell.x}
            top={cell.y}
            color={cell.data.color}
          />
        ))}
    </Canvas>
  );
};

const Canvas = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: gray;
`;

const Cell = styled.div`
  position: absolute;
  left: ${(props) => 50 - parseInt(props.left)}%;
  top: ${(props) => 50 - parseInt(props.top)}%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
