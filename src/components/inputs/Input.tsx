import React from "react";
import styled from "styled-components";

export type InputProps = {
  type: string;
  value?: string;
  name: string;
  label?: string;
  onChange?: any;
  placeholder?: string;
  required?: boolean;
};

export const Input: React.FC<InputProps> = ({
  type,
  value,
  name,
  label,
  onChange,
  placeholder,
  required,
}: InputProps) => {
  return (
    <>
      {label && (
        <LabelBlock>
          <LabelDiv htmlFor={label}>{label}</LabelDiv>
          <InputDiv
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
          />
        </LabelBlock>
      )}

      {!label && (
        <InputDiv
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        />
      )}
    </>
  );
};

const InputDiv = styled.input`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.size.s};
  border: ${({ theme }) => theme.border.secondary};
  border-radius: ${({ theme }) => theme.size.xs};
  background-color: transparent;
  margin: 10px 0;
  font-family: ${({ theme }) => theme.fonts.family.secondary};
  color: ${({ theme }) => theme.colors.light};
  min-width: 100%;
`;

const LabelDiv = styled.label`
  font-family: ${({ theme }) => theme.fonts.family.secondary};
  color: ${({ theme }) => theme.colors.light};
`;

const LabelBlock = styled.div`
  text-align: left;
`;
