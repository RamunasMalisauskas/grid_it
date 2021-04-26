import React from 'react';
import { useHistory } from 'react-router';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUserName, } from "../state/actions";
import { storageItems } from '../constants/stateConstants';
import { FormTemplate, SupportButton } from '../components';
import { userPageFormInputs } from '../utils/formData';

interface UserPageProps {
}


export const UserPage: React.FC<UserPageProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handelNameChange = (e: any) => {
        e.preventDefault()
        const { target:
            { userName: {
                value: userName
            } } } = e
        dispatch(setUserName(userName));
        localStorage.setItem(storageItems.name, userName);
    }

    return (
        <Canvas>
            <FomrBlock>
                <FormTemplate
                    inputs={userPageFormInputs}
                    handleSubmit={handelNameChange}
                    buttonText="update"
                />
            </FomrBlock>

            <NavBlock>
                <SupportButton onClick={() => history.push(`/`)}>
                    Back
                 </SupportButton>
            </NavBlock>
        </Canvas>
    );
}

const Canvas = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #cccccc;
`;

const FomrBlock = styled.div`
 padding: 40px;
 border-radius: 10px;
 position: absolute;
 top: 10%;
 left: 50%;
 transform: translate(-50%, -10%);
 background-color: #2c2c2c;
`;

const NavBlock = styled.div`
 position: absolute;
 top: 5%;
 right: 5%;
`;