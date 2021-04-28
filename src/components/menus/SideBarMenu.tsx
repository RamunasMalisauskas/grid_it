/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  setSideBar,
  setErrorMsg,
  setSideBarContent,
  setCanvasPosition,
} from "../../state/actions";
import { addToBoard } from "../../apis";
import {
  StateType,
  menuState,
  sideBarContentState,
  log,
  error,
} from "../../types/types";
import { SupportButton, PrimaryButton, Subtitle, FormTemplate } from "../";
import { addCellFormInputs, addClassFormInputs } from "../../utils/formData";
import { auth, usersDB } from "../../firebase/config";
import { setFirestoreUserData } from "../../firebase/firestore";

interface SideBarProps {
  open: string;
}

export const SideBarMenu: React.FC = () => {
  const dispatch = useDispatch();
  const randomColor = require("randomcolor");
  const { canvasPosition, dataLimit } = useSelector(
    (state: StateType) => state.canvaState
  );
  const { errorMsg, sideBar, sideBarContent } = useSelector(
    (state: StateType) => state.appState
  );
  const { userName, loginStatus } = useSelector(
    (state: StateType) => state.userState
  );

  const handleBarState = () =>
    dispatch(
      setSideBar(sideBar === menuState.close ? menuState.open : menuState.close)
    );

  const handleBarFormState = () => {
    dispatch(
      setSideBarContent(
        sideBarContent === sideBarContentState.addCell
          ? sideBarContentState.addClass
          : sideBarContentState.addCell
      )
    );
    dispatch(setErrorMsg(error.empty));
  };

  const handleAddCell = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      if (!e) return;
      if (!canvasPosition) return;
      e.preventDefault();
      const {
        target: {
          number: { value: number },
          data: { value: data },
          cellName: { value: cellName },
        },
      } = e;

      if (number.length > 0 && data.length > 0) {
        dispatch(setErrorMsg(error.empty));

        addToBoard({
          userName: userName,
          userColor: randomColor(),
          x: canvasPosition.x + parseInt(number),
          y: canvasPosition.y + parseInt(number),
          cellData: {
            value: parseInt(data),
            cellName: cellName,
          },
        });

        setFirestoreUserData(userName);
        dispatch(setErrorMsg(error.success));
      } else {
        dispatch(setErrorMsg(error.fillInputs));
      }
    },
    []
  );

  const handleAddClass = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      if (!e) return;
      if (!canvasPosition) return;
      e.preventDefault();

      const {
        target: {
          className: { value: className },
        },
      } = e;

      if (className.length > 0) {
        dispatch(setErrorMsg(error.empty));

        const user = auth.currentUser;
        if (user) {
          try {
            const { uid } = user;
            const classData = await usersDB
              .doc(uid)
              .collection("classInfo")
              .get();
            const classDoc = await usersDB
              .doc(uid)
              .collection("classInfo")
              .doc();
            const classAllDocs = classData.docs.map((doc) => doc.data());
            const nameArray = classAllDocs.map((item) => item.class.name);

            if (!nameArray.includes(className)) {
              dispatch(setErrorMsg(error.success));
              const random = parseInt((Math.random() * 20).toFixed(0)) * 50;

              const newCanva = {
                x: canvasPosition.x + random,
                y: canvasPosition.y + random,
              };
              dispatch(setCanvasPosition(newCanva));

              await classDoc.set({
                class: {
                  name: className,
                  position: newCanva,
                },
              });
            } else {
              dispatch(setErrorMsg(error.classExist));
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        dispatch(setErrorMsg(error.fillInputs));
      }
    },
    []
  );

  return (
    <SideBlock open={sideBar}>
      {loginStatus === log.in && (
        <>
          <SideBarContainer>
            <ControlBLock>
              <PrimaryButton onClick={handleBarState}>
                {sideBar === menuState.close ? "add stuff" : "x"}
              </PrimaryButton>
            </ControlBLock>

            {sideBar === menuState.open && (
              <>
                {!dataLimit && (
                  <>
                    {sideBarContent === sideBarContentState.addCell && (
                      <>
                        <SupportButton onClick={handleBarFormState}>
                          go to add class
                        </SupportButton>

                        <FormTemplate
                          buttonText="Add Cell"
                          handleSubmit={handleAddCell}
                          inputs={addCellFormInputs}
                        />
                      </>
                    )}

                    {sideBarContent === sideBarContentState.addClass && (
                      <>
                        <SupportButton onClick={handleBarFormState}>
                          go to add cell
                        </SupportButton>

                        <FormTemplate
                          buttonText="Add Class"
                          handleSubmit={handleAddClass}
                          inputs={addClassFormInputs}
                        />
                      </>
                    )}
                  </>
                )}

                <Subtitle>{errorMsg}</Subtitle>
              </>
            )}
          </SideBarContainer>
        </>
      )}
    </SideBlock>
  );
};

const SideBlock = styled.div<SideBarProps>`
  position: absolute;
  top: 0;
  left: ${({ open }) => (open === menuState.open ? "0" : "-120px")};
  height: 100%;
  background: ${({ open }) =>
    open === menuState.open ? "rgba(104, 104, 104, 0.3)" : "rgba(0, 0, 0, 0)"};
  transition: all ease-in-out 0.3s;
`;

const SideBarContainer = styled.div`
  padding: 15px;
  margin: 0 auto;
  width: 285px;
  text-align: right;
`;

const ControlBLock = styled.div`
  width: 100%;
`;
