import React from 'react'
import styled from "styled-components";

interface TextProps {
    color?: string
}

export const Paragraph: React.FC<TextProps> = ({ color, children }) => {
    return (
        <P color={color}>
            {children}
        </P>
    );
}


export const HeaderLarge: React.FC<TextProps> = ({ color, children }) => {
    return (
        <H1 color={color}>
            {children}
        </H1>
    );
}


const P = styled.p<TextProps>`
color: ${({ color }) => color || "white"};
font-family: 'Montserrat', sans-serif;
`

const H1 = styled.h1`
color: ${({ color }) => color || "white"};
font-family: 'Zen Dots', cursive;
text-transform: uppercase;

`