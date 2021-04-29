import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { PrimaryButton } from "../";
import { StateType, menuState, storageItems } from "../../types/types";
import { setModalState } from "../../state/actions";

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
  height: 400px;
  width: 400px;
  background-color: red;
`;
