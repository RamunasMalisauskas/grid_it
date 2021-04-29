import styled from "styled-components";
import { PrimaryButton } from "../";

export const SupportButton = styled(PrimaryButton)`
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.secondary};
  border: ${({ theme }) => theme.border.secondary};
  &:active {
    background: transparent;
  }
`;
