import React, { useCallback } from "react";
import styled from "styled-components";
import { fadein } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import {
  setClassData,
  setClassMenu,
  setCanvasPosition,
} from "../../state/actions";
import { StateType, menuState, log } from "../../types/types";
import { SupportButton, PrimaryButton } from "../";
import { usersDB, auth } from "../../firebase/firebase";

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
        const classArray = await snapshot.docs.map((doc) => doc.data().class);
        dispatch(setClassData(classArray));
        dispatch(setClassMenu(menuState.open));
      } catch (err) {
        console.log(err);
      }
    }
  }, [classData]);

  console.log();

  const handleClassClick = (position: { x: number; y: number }) => {
    console.log("className ", position);
    dispatch(setCanvasPosition(position));
  };

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

              {classData.map((x) => (
                <ControlBLock key={`btn_index_${x.name}`}>
                  <SupportButton onClick={() => handleClassClick(x.position)}>
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
  transform: ${({ close }) => (close ? "translateY(-40px)" : "translate(0)")};
  transition: right ease-in-out 0.3s 0.3s, transform ease-in-out 0.3s 0.6s;
  -webkit-animation: ${fadein} 1.6s forwards linear;
  animation: ${fadein} 1.6s forwards linear;
`;

const ControlBLock = styled.div`
  width: 100%;
`;
