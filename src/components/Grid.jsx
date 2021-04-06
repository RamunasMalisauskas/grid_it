import React, { useContext } from "react";
import styled from "styled-components";
import { BoardContext } from "../context";

//  rethink data visualisation/ position on canvas (top left rigth bottom)
export const Grid = () => {
  const boardData = useContext(BoardContext).boardData;

  return (
    <Canvas>
      {boardData &&
        boardData.map((cell) => (
          <>
            <Cell
              key={cell.data.createdAt}
              left={1000 - cell.x}
              top={1000 - cell.y}
              color={cell.data.color}
            />

            <CellInfo
              key={cell.x + cell.data.name}
              left={1000 - cell.x}
              top={1000 - cell.y}
            >
              {cell.data.name}
            </CellInfo>
          </>
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
  left: ${(props) => 50 + parseInt(props.left)}%;
  top: ${(props) => 50 + parseInt(props.top)}%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const CellInfo = styled.div`
  position: absolute;
  opacity: 0;
  padding: 5px;
  left: ${(props) => 50 + parseInt(props.left)}%;
  top: ${(props) => 50 + parseInt(props.top)}%;
  &:hover {
    opacity: 1;
    cursor: default;
  }
`;

const CenterCell = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: black;
`;
