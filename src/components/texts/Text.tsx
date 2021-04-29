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
  color: ${({ color, theme }) => color || theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.family.secondary};
`;

const H1 = styled.h1`
  color: ${({ color, theme }) => color || theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.family.primary};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fonts.weigth.regular};
`;

const H1Dec = styled.h1`
  color: ${({ color, theme }) => color || theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.family.support};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.size.xxl};
  line-height: 0;
  font-weight: ${({ theme }) => theme.fonts.weigth.bold};
`;

const H2 = styled.h2`
  color: ${({ color, theme }) => color || theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-weight: ${({ theme }) => theme.fonts.weigth.regular};
`;
