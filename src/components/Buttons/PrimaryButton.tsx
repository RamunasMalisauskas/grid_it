import styled from "styled-components";

export const PrimaryButton = styled.button`
  color: white;
  background: #707070;
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  border: 2px solid #707070;
  font-family: "Zen Dots", cursive;
  text-transform: uppercase;
  transition: all ease-in-out 0.1s;
  &:hover {
    box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
    cursor: pointer;
    background: transparent;
  }
`;
