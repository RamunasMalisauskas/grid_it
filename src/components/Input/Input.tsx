import React from 'react'
import styled from "styled-components";

export const Input: React.FC<
    React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, value, name, onChange, placeholder }) => {
    return (
        <>
            {name &&
                <LabelBlock>
                    <LabelDiv htmlFor={name} >{name}</LabelDiv>
                    <InputDiv type={type} value={value} name={name} placeholder={placeholder} onChange={onChange} />
                </LabelBlock>
            }

            {!name &&
                <InputDiv type={type} value={value} name={name} placeholder={placeholder} onChange={onChange} />}
        </>
    );
}

const InputDiv = styled.input`
 box-sizing: border-box;
 padding: 10px;
 border: 2px solid #707070;
 border-radius:5px;
 background-color: transparent;
 margin: 10px 0;
 font-family: 'Montserrat', sans-serif;
 color: white;
 min-width: 100%;
`

const LabelDiv = styled.label`
 font-family: 'Montserrat', sans-serif;
 color: white;
`

const LabelBlock = styled.div`
 text-align: left;
`