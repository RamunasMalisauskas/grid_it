import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Cell, Spinner, TitleLarge } from "..";
import { setErrorMsg, setInfoMsg, setDataLimit } from "../../state/actions";
import { StateType, sideBarState, log } from "../../types/types";

type CenterCircleProps = {
  size: number;
  position: boolean;
};

export const Grid: React.FC = () => {
  const dispatch = useDispatch();
  const circleSize = 300;
  const { canvasData } = useSelector((state: StateType) => state.canvaState);
  const { loginStatus } = useSelector((state: StateType) => state.userState);
  const { sideBar, infoMsg } = useSelector(
    (state: StateType) => state.appState
  );

  const generatedCanvas = useMemo(() => {
    if (!canvasData) return;
    if (
      canvasData.length === 0 ||
      canvasData[0].data === null ||
      !canvasData[0].data.data.value
    ) {
      dispatch(setInfoMsg("Please Enter Data"));
      return;
    }

    if (canvasData.length <= 8) {
      dispatch(setErrorMsg(""));
    }
    if (canvasData.length > 8) {
      dispatch(setErrorMsg("You're about to reach maximum capacity of cells"));
      dispatch(setDataLimit(false));
    }

    if (canvasData.length > 10) {
      dispatch(
        setErrorMsg(
          "maximum capacity of cells has been reached. Remove some of if"
        )
      );
      dispatch(setDataLimit(true));
    }

    // web worker ideti
    dispatch(setInfoMsg(""));
    const radiusIncrement = 360 / canvasData.length;
    const valueArray = canvasData.map((x) => x.data.data.value);
    const valueSum = valueArray.reduce((a, b) => a + b, 0);
    let startDeg = 0;
    //

    return (
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
        ))}
      </>
    );
  }, [canvasData]);

  return (
    <Canvas>
      {loginStatus === log.in && (
        <>
          <CenterBlock>
            <TitleLarge>{infoMsg}</TitleLarge>
          </CenterBlock>

          {!generatedCanvas && (
            <CenterBlock>
              <Spinner color="white" />
            </CenterBlock>
          )}
          <CenterCircle
            size={circleSize}
            position={sideBar === sideBarState.open}
          >
            {generatedCanvas}
          </CenterCircle>
        </>
      )}
    </Canvas>
  );
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
  left: ${({ position }) => (position ? `calc(50% + 200px)` : `50%`)};
  transition: all ease-in-out 0.3s 0.3s;
  transform: translate(-50%, -50%);
  background-color: rgba(209, 209, 209, 0.4);
  & ::after {
    & :last-child {
      transform: translateX(${({ size }) => size / 2 + 15}px)
        translateY(${({ size }) => -size / 20}%);
    }
  }
`;

const CenterBlock = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
