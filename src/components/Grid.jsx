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
          <div key={`${cell.data.createdAt}${cell.data.name}`}>
            <CellInfo left={cell.x} top={cell.y}>
              {cell.data.name}
            </CellInfo>

            <Cell left={cell.x} top={cell.y} color={cell.data.color} />
          </div>
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
  left: ${(props) => 50 - parseInt(props.left)}%;
  top: ${(props) => 50 - parseInt(props.top)}%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const CellInfo = styled.div`
  position: absolute;
  opacity: 0;
  padding: 5px;
  z-index: 1;
  left: ${(props) => 50 - parseInt(props.left)}%;
  top: ${(props) => 50 - parseInt(props.top)}%;
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
