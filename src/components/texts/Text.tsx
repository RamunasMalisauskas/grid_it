import React from "react";
import styled from "styled-components";

interface TextProps {
  color?: string;
  children: string | number | (string | number)[];
}

export const Paragraph: React.FC<TextProps> = ({
  color,
  children,
}: TextProps) => {
  return <P color={color}>{children}</P>;
};

export const TitleLarge: React.FC<TextProps> = ({
  color,
  children,
}: TextProps) => {
  return <H1 color={color}>{children}</H1>;
};

export const TitleMasive: React.FC<TextProps> = ({
  color,
  children,
}: TextProps) => {
  return <H1Dec color={color}>{children}</H1Dec>;
};

export const Subtitle: React.FC<TextProps> = ({
  color,
  children,
}: TextProps) => {
  return <H2 color={color}>{children}</H2>;
};

const P = styled.p<TextProps>`
  color: ${({ color }) => color || "white"};
  font-family: "Montserrat", sans-serif;
`;

const H1 = styled.h1`
  color: ${({ color }) => color || "white"};
  font-family: "Zen Dots", cursive;
  text-transform: uppercase;
  font-weight: normal;
`;

const H1Dec = styled.h1`
  color: ${({ color }) => color || "white"};
  font-family: "Reenie Beanie", cursive;
  text-transform: uppercase;
  font-size: 200px;
  line-height: 0;
  font-weight: bold;
`;

const H2 = styled.h2`
  color: ${({ color }) => color || "white"};
  font-family: "Zen Dots", cursive;
  font-weight: normal;
`;
