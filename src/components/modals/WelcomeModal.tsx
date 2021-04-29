import React from "react";
import styled from "styled-components";
import { PrimaryButton } from "../";
import { storageItems, menuState, StateType } from "../../types/types";
import { setModalState } from "../../state/actions";
import { useSelector, useDispatch } from "react-redux";
import modalImage from "../../assets/images/welcome_modal.png";

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
          <PrimaryButton onClick={handleModalState}>close modal</PrimaryButton>
          <ModalImage src={modalImage} />
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
  height: 100vh;
  width: 100vw;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const ModalImage = styled.img`
  object-fit: contain;
  margin: 0 auto;
  height: 90vh;
  width: 90vw;
`;
