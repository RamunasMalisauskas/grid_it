import React, { useCallback } from "react";
import styled from "styled-components";
import { fadein } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import {
  setClassMenu,
  setCanvasPosition,
  setClassName,
  setClassData,
  setErrorMsg,
  setDataLimit,
  setCanvasData,
} from "../../state/actions";
import { StateType, menuState, log, ClassType, error } from "../../types/types";
import { SupportButton, PrimaryButton } from "../";
import { auth, usersDB } from "../../firebase/config";
import { fetchCanvaData } from "../../apis";

interface MenuProps {
  close: boolean;
}

export const ClassMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { classData } = useSelector((state: StateType) => state.canvaState);
  const { classMenu } = useSelector((state: StateType) => state.appState);
  const { loginStatus } = useSelector((state: StateType) => state.userState);

  const handleGetClassNames = useCallback(async () => {
    const user = auth.currentUser;
    if (user) {
      const { uid } = user;
      try {
        const snapshot = await usersDB.doc(uid).collection("classInfo").get();
        const classArray: ClassType[] = await snapshot.docs.map(
          (doc) => doc.data().class
        );
        dispatch(setClassData(classArray));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(setClassMenu(menuState.open));
  }, [classData]);

  const handleClassSelect = useCallback(
    async (position: { x: number; y: number }, name: string) => {
      const canvasData = await fetchCanvaData({
        xposition: position.x,
        yposition: position.y,
      });
      if (canvasData) {
        if (
          canvasData.length === 0 ||
          canvasData[0].data === null ||
          !canvasData[0].data.data.value
        ) {
          dispatch(setErrorMsg(error.noData));
        }
        if (canvasData.length <= 8 && canvasData.length > 0) {
          dispatch(setErrorMsg(error.empty));
        }
        if (canvasData.length > 8) {
          dispatch(setErrorMsg(error.allmostMax));
          dispatch(setDataLimit(false));
        }
        if (canvasData.length > 10) {
          dispatch(setErrorMsg(error.maxCells));
          dispatch(setDataLimit(true));
        }
        dispatch(setCanvasData(canvasData));
      }
      dispatch(setClassName(name));
      sessionStorage.setItem("x", position.x.toString());
      console.log("class ", position);
      dispatch(setCanvasPosition(position));
    },
    []
  );

  const handleClassMenu = () => {
    dispatch(setClassMenu(menuState.close));
  };

  return (
    <ClassMenuBlock close={classMenu === menuState.close}>
      {loginStatus === log.in && (
        <>
          {classMenu === menuState.close && (
            <ControlBLock>
              <PrimaryButton onClick={handleGetClassNames}>
                Get Classes
              </PrimaryButton>
            </ControlBLock>
          )}

          {classMenu === menuState.open && classData && (
            <>
              <PrimaryButton onClick={handleClassMenu}>close</PrimaryButton>

              <ControlBLock>
                <SupportButton
                  onClick={() =>
                    handleClassSelect({ x: 2000, y: 2000 }, "grid it")
                  }
                >
                  grid it
                </SupportButton>
              </ControlBLock>

              {classData.map((x) => (
                <ControlBLock key={`btn_index_${x.name}`}>
                  <SupportButton
                    onClick={() => handleClassSelect(x.position, x.name)}
                  >
                    {x.name}
                  </SupportButton>
                </ControlBLock>
              ))}
            </>
          )}
        </>
      )}
    </ClassMenuBlock>
  );
};

const ClassMenuBlock = styled.div<MenuProps>`
  position: absolute;
  top: 165px;
  right: ${({ close }) => (close ? "0%" : "40px")};
  text-align: right;
  z-index: 1;
  padding: 15px;
  height: 350px;
  overflow-x: hidden;
  overflow-y: scroll;
  transform: ${({ close }) => (close ? "translateY(-40px)" : "translate(0)")};
  transition: right ease-in-out 0.3s 0.3s, transform ease-in-out 0.3s 0.6s;
  -webkit-animation: ${fadein} 1.6s forwards linear;
  animation: ${fadein} 1.6s forwards linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ControlBLock = styled.div`
  width: 100%;
`;
