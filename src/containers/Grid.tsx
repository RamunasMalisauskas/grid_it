import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Cell, Spinner } from "../components";
import { log } from "../constants/stateConstants";
import { BoardDataState } from "../types/types";

type CenterCircleProps = {
  size: number;
};

export const Grid: React.FC = () => {
  const canvasData = useSelector((state: BoardDataState) => state.appData.canvasData);
  const loginStatus = useSelector((state: BoardDataState) => state.appData.login);
  const circleSize = 400;

  const generatedCanvas = useMemo(() => {
    if (!canvasData) return
    if (canvasData.length === 0) return
    if (canvasData[0].data === null) return
    if (!canvasData[0].data.data.value) return

    // web worker ideti
    const radiusIncrement = 360 / canvasData.length;
    const valueArray = canvasData.map((x) => x.data.data.value);
    const valueSum = valueArray.reduce((a, b) => a + b, 0);
    let startDeg = 0;
    //

    return (
      loginStatus === log.in && (
        <>
          {canvasData.map((cell, index) => (
            <Cell
              key={cell._id}
              cell={cell}
              cellRadiusIncr={(startDeg += radiusIncrement)}
              valueSum={valueSum}
              valueDif={
                (cell.data.data.value - valueArray.slice(1)[index]) / valueSum
              }
              circleSize={circleSize}
            />
          ))
          }

        </>
      )
    );
  }, [canvasData, loginStatus]);

  return (
    <Canvas>
      {!generatedCanvas &&
        <SpinnerBlock>
          <Spinner color="white" />
        </SpinnerBlock>
      }

      <CenterCircle size={circleSize}>
        {generatedCanvas}
      </CenterCircle>
    </Canvas>
  )
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(209, 209, 209, 0.4);
`;

const SpinnerBlock = styled.div`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
`
