import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Spinner, Cell } from '../components'
import { BoardDataState } from '../types/types'

type CenterCircleProps = {
  size: number;
}
export const Grid: React.FC = () => {
  const canvasData = useSelector((state: BoardDataState) => state.appData.canvasData);
  const loginStatus = useSelector((state: BoardDataState) => state.appData.login)

  if (canvasData) {
    const radiusIncrement = 360 / canvasData.length
    const valueArray = canvasData.map((x) => x.data.data.value)
    const valueSum = valueArray.reduce((a, b) => a + b, 0)
    const circleSize = 400
    let startDeg = 0

    return (
      <Canvas>
        {loginStatus === "loggedIn" &&
          <CenterCircle size={circleSize}>
            {canvasData.map((cell, index) => (
              <Cell
                key={cell._id}
                cell={cell}
                cellRadiusIncr={startDeg += radiusIncrement}
                valueSum={valueSum}
                valueDif={(cell.data.data.value - valueArray.slice(1)[index]) / valueSum}
                circleSize={circleSize}
              />
            ))}
          </CenterCircle>
        }
      </Canvas>
    );
  }
  else {
    return (
      <Canvas>
        <CenterBlock>
          <Spinner color="#ffffff" />
        </CenterBlock>
      </Canvas>
    )
  }
};

const Canvas = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #2c2c2c;
`;

const CenterCircle = styled.div<CenterCircleProps>`
 width: ${({ size }) => size}px;
 height: ${({ size }) => size}px;
 border-radius: 50%;
 position:absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 background-color: rgba(209, 209, 209, 0.4);
`

const CenterBlock = styled.div`
 position:absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 text-align: center;
 width: 30vw;
`

