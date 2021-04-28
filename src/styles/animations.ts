import { keyframes } from "styled-components";

export const bounce = keyframes`
{
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
`;
export const rotate = keyframes`
{ 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
`;

export const fadein = keyframes` 
{
    0% { opacity:0; }
    66% { opacity:0; }
    100% { opacity:1; }
}
`;
