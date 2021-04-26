import React from 'react'
import { Input, PrimaryButton } from '../'
import { InputProps } from '../../components/inputs/Input'

interface FormTemplateProps {
    inputs: [],
    handleSubmit: () => void,
    buttonText: string
}

export const FormTemplate: React.FC<FormTemplateProps> = ({ inputs, buttonText, handleSubmit }) => {

    return (
        <form
            onSubmit={handleSubmit}
        >
            {inputs.map((input: InputProps, index) => (
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
        </form>
    );
}
