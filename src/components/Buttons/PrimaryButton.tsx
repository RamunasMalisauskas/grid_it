import styled from "styled-components";

export const PrimaryButton = styled.button`
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.size.s};
  margin: 5px 0;
  border-radius: ${({ theme }) => theme.size.s};
  border: ${({ theme }) => theme.border.primary};
  font-family: ${({ theme }) => theme.fonts.family.primary};
  text-transform: uppercase;
  transition: ${({ theme }) => theme.transition.allFast};
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow};
    cursor: pointer;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
    cursor: pointer;
    background: transparent;
  }
`;
