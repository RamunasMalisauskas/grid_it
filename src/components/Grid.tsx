import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Cell } from '../components'
import { canvaDataType } from '../apis/get'

type BoardDataState = {
  appData: {
    canvasData: canvaDataType[]
  }
}
// *** TO DO ***
// Memo data

export const Grid: React.FC = () => {
  const canvasData = useSelector((state: BoardDataState) => state.appData.canvasData);


  if (canvasData) {
    const radius = 360 / canvasData.length
    let startDeg = 0

    return (
      <Canvas>
        {canvasData &&
          canvasData.map((cell) => (
            <Cell key={cell._id} cell={cell} cellPostion={startDeg += radius} />
          ))}
      </Canvas>
    );
  }
  else {
    return <Canvas><Title>LOADING</Title></Canvas>
  }
};

const Canvas = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #222222;
`;

const Title = styled.h2`
color: White;
size: 50px;
position: absolute;
top: 50%;
left: 50%;
`

