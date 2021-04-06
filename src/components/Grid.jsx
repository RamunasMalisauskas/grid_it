import React, { useContext } from "react";
import styled from "styled-components";
import { BoardContext } from "../context";

// get data from context and map it
export const Grid = () => {
  const boardData = useContext(BoardContext).boardData;

  return (
    <Canvas>
      {boardData &&
        boardData.map((cell) => (
          <Cell
            key={cell.data.createdAt}
            left={1000 - cell.x}
            top={1000 - cell.y}
            color={cell.data.color}
          />
        ))}

      <CenterCell />
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
  left: ${(props) => 50 + parseInt(props.left * 2)}%;
  top: ${(props) => 50 + parseInt(props.top * 2)}%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const CenterCell = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
`;
