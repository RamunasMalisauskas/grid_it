import React from 'react'
import { PrimaryButton, Input, SupportButton } from '../components'
import styled from "styled-components";

interface UserPageProps {

}

export const UserPage: React.FC<UserPageProps> = () => {
    return (
        <Canvas>
            userPage
        </Canvas>
    );
}

const Canvas = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #707070;
`;