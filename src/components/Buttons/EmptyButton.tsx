import styled from "styled-components";
import { PrimaryButton } from "../";

export const EmptyButton = styled(PrimaryButton)`
  color: ${({ theme }) => theme.colors.secondary};
  background: transparent;
  border: ${({ theme }) => theme.border.secondary};
  &:active {
    color: white;
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
