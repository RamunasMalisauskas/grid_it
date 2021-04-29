import React from "react";
import styled from "styled-components";
import { PrimaryButton } from "../";
import { storageItems, menuState, StateType } from "../../types/types";
import { setModalState } from "../../state/actions";
import { useSelector, useDispatch } from "react-redux";

export const WelcomeModal: React.FC = () => {
  const dispatch = useDispatch();
  const { modalState } = useSelector((state: StateType) => state.appState);
  const handleModalState = () => {
    dispatch(setModalState(menuState.close));
    sessionStorage.setItem(storageItems.modal, menuState.close);
  };
  return (
    <>
      {modalState === menuState.open && (
        <Modal>
          <PrimaryButton onClick={handleModalState}>X</PrimaryButton>
        </Modal>
      )}
      {modalState === menuState.close && <></>}
    </>
  );
};

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  height: 400px;
  width: 400px;
  background-color: red;
`;
