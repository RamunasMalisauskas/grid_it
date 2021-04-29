/* eslint-disable prettier/prettier */
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Cell, TitleMasive, WelcomeModal } from "..";
import { StateType, menuState, log } from "../../types/types";

type CenterCircleProps = {
  size: number;
  position: boolean;
};

export const Grid: React.FC = () => {
  const circleSize = window.innerWidth / 5;
  const { canvasData, className } = useSelector((state: StateType) => state.canvaState);
  const { loginStatus } = useSelector((state: StateType) => state.userState);
  const { sideBar } = useSelector((state: StateType) => state.appState);

  const generatedCanvas = useMemo(() => {
    if (!canvasData) return;
    const radiusIncrement = 360 / canvasData.length;
    const valueArray = canvasData.map((x) => x.data.data.value);
    const valueSum = valueArray.reduce((a, b) => a + b, 0);
    let startDeg = 0;

    return (
      <>
        {canvasData.map((cell, index) => (
          <Cell
            key={`cell_id_${cell._id}`}
            cell={cell}
            cellRadiusIncr={(startDeg += radiusIncrement)}
            valueSum={valueSum}
            valueDif={
              (cell.data.data.value - valueArray.slice(1)[index]) / valueSum
            }
            circleSize={circleSize}
          />
        ))}
      </>
    );
  }, [canvasData]);

  return (
    <Canvas>
      {loginStatus === log.in && (
        <>
         <WelcomeModal />

          <CenterCircle
            size={circleSize}
            position={sideBar === menuState.open}
          >
            {generatedCanvas}
          </CenterCircle>

          <CenterBlock>
            <TitleMasive color="black">
              {className}
            </TitleMasive>
          </CenterBlock>
        </>
      )}
    </Canvas>
  );
};

const Canvas = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.dark};
  overflow: hidden;
`;

const CenterCircle = styled.div<CenterCircleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: ${({ position }) => (position ? `calc(50% + 135px)` : `50%`)};
  transition:  ${({ theme }) => theme.transition.allDelay};
  transform: translate(-50%, -50%);
  background-color:${({ theme }) => theme.colors.support};;
  & :last-child {
      transform: translateX(${({ size }) => size / 2 + 15}px)
        translateY(${({ size }) => -size / 20}%);
  }
`;

const CenterBlock = styled.div`
  text-align: center;
  position: absolute;
  width: 800px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
