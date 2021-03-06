/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addToBoard } from "../../apis";
import { SupportButton, PrimaryButton, Subtitle, FormTemplate } from "../";
import { addCellFormInputs, addClassFormInputs } from "../../utils/formData";
import { auth, usersDB, setFirestoreUserData } from "../../firebase";
import {
  setSideBar,
  setErrorMsg,
  setSideBarContent,
  setCanvasPosition,
} from "../../state/actions";
import {
  StateType,
  menuState,
  sideBarContentState,
  log,
  error,
  dbCollections,
} from "../../types/types";

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
    async (e) => {
      if (!e) return;
      e.preventDefault();
      const {
        target: {
          number: { value: number },
          data: { value: data },
          cellName: { value: cellName },
        },
      } = e;

      dispatch(setErrorMsg(error.empty));

      if (number.length > 0 && data.length > 0) {
        try {
          await addToBoard({
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
        } catch (e) {
          console.log(e);
        } finally {
          dispatch(setErrorMsg(error.success));
        }
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
        const user = auth.currentUser;
        if (!user) return;
        try {
          const { uid } = user;
          const classData = await usersDB
            .doc(uid)
            .collection(dbCollections.classInfo)
            .get();
          const classDoc = await usersDB
            .doc(uid)
            .collection(dbCollections.classInfo)
            .doc();
          const classAllDocs = classData.docs.map((doc) => doc.data());
          const nameArray = classAllDocs.map((item) => item.class.name);

          if (!nameArray.includes(className)) {
            const random = parseInt((Math.random() * 20).toFixed(0)) * 50;
            const newCanva = {
              x: canvasPosition.x + random,
              y: canvasPosition.y + random,
            };
            await classDoc.set({
              class: {
                name: className,
                position: newCanva,
              },
            });
            dispatch(setCanvasPosition(newCanva));
            dispatch(setErrorMsg(error.empty));
          } else {
            dispatch(setErrorMsg(error.classExist));
          }
        } catch (e) {
          console.log(e);
        } finally {
          dispatch(setErrorMsg(error.success));
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
  left: ${({ open }) => (open === menuState.open ? "0" : "-135px")};
  height: 100%;
  background: ${({ open, theme }) =>
    open === menuState.open ? theme.colors.supportDark : "transparent"};
  transition: ${({ theme }) => theme.transition.allSlow};
`;

const SideBarContainer = styled.div`
  padding: ${({ theme }) => theme.size.m};
  margin: 0 auto;
  width: ${({ theme }) => theme.size.xxxl};
  text-align: right;
`;

const ControlBLock = styled.div`
  width: 100%;
`;
