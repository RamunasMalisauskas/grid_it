import React from 'react'
import styled from "styled-components";

interface InputProps {
    type: string
    value: string
    name?: string
    handleChange: (() => void)

}

export const Input: React.FC<InputProps> = ({ type, value, name, handleChange }) => {
    return (
        <>
            {name &&
                <LabelBlock>
                    <LabelDiv htmlFor={name} />
                    <InputDiv type={type} value={value} name={name} onChange={handleChange} />
                </LabelBlock>
            }

            {!name &&
                <InputDiv type={type} value={value} name={name} onChange={handleChange} />}
        </>
    );
}

const InputDiv = styled.input`
padding: 10px;
border: 2px solid #707070;
background-color: transparent;
`

const LabelDiv = styled.label`
font-family: 'Montserrat', sans-serif;
color: white;

`

const LabelBlock = styled.div`
display: inline
`