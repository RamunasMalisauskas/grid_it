/* eslint-disable react/prop-types */
import React from "react";
import { Input, PrimaryButton, SupportButton } from "../";
import { InputProps } from "../../components/inputs/Input";

interface FormTemplateProps {
  inputs: InputProps[];
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleClick?: () => void;
  buttonText: string;
  supportText?: string;
  supportBtn?: boolean;
}

export const FormTemplate: React.FC<FormTemplateProps> = ({
  inputs,
  buttonText,
  handleSubmit,
  supportBtn,
  handleClick,
  supportText,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => (
        <Input
          type={input.type}
          key={input.name + index}
          name={input.name}
          value={input.value}
          label={input.label}
          onChange={input.onChange}
          placeholder={input.placeholder}
          required={input.required}
        />
      ))}

      <PrimaryButton>{buttonText}</PrimaryButton>

      {supportBtn && (
        <>
          <SupportButton onClick={handleClick}>{supportText}</SupportButton>
        </>
      )}
    </form>
  );
};
