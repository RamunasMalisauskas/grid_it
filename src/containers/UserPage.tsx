import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../state/actions";
import { FormTemplate, PrimaryButton, TitleMasive } from "../components";
import { userPageFormInputs } from "../utils/formData";
import { StateType, storageItems } from "../types/types";

export const UserPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userName } = useSelector((state: StateType) => state.userState);

  const handelNameChange: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (!e) return;
    e.preventDefault();
    const {
      target: {
        userName: { value: userName },
      },
    } = e;
    dispatch(setUserName(userName));
    localStorage.setItem(storageItems.name, userName);
  };

  return (
    <Canvas>
      <FomrBlock>
        <TitleMasive>{userName}</TitleMasive>

        <FormTemplate
          inputs={userPageFormInputs}
          handleSubmit={handelNameChange}
          buttonText="update"
        />
      </FomrBlock>

      <NavBlock>
        <PrimaryButton onClick={() => history.push(`/`)}>Back</PrimaryButton>
      </NavBlock>
    </Canvas>
  );
};

const Canvas = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const FomrBlock = styled.div`
  padding: ${({ theme }) => theme.size.xl};
  border-radius: ${({ theme }) => theme.size.m};
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  background-color: ${({ theme }) => theme.colors.dark};
`;

const NavBlock = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
`;
