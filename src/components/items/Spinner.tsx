import React from "react";
import styled from "styled-components";
import { bounce, rotate } from "../../styles";

interface SpinnerProps {
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ color }: SpinnerProps) => {
  return (
    <SpinnerBlock>
      <DotOne color={color} />
      <DotTwo color={color} />
    </SpinnerBlock>
  );
};

const SpinnerBlock = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  text-align: center;
  -webkit-animation: ${rotate} 1.6s infinite linear;
  animation: ${rotate} 1.6s infinite linear;
`;

const Dot = styled.div`
  width: 40%;
  height: 40%;
  display: inline-block;
  position: absolute;
  background-color: ${({ color }) => color};
  border-radius: 100%;
`;
const DotOne = styled(Dot)`
  top: 0;
  -webkit-animation: ${bounce} 1.6s infinite ease-in-out;
  animation: ${bounce} 1.6s infinite ease-in-out;
`;
const DotTwo = styled(Dot)`
  bottom: 0;
  -webkit-animation: ${bounce} 1.6s infinite ease-in-out -0.8s;
  animation: ${bounce} 1.6s infinite ease-in-out -0.8s;
`;
