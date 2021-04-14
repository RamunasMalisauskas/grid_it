import React from 'react'
import styled from "styled-components";
import { canvaDataType } from '../apis/get'
import { deleteFromBoard } from "../apis/delete";

interface CellProps {
    cell: canvaDataType
    cellPostion: number
}

type CellBlockProps = {
    key: string;
    onClick: () => void;
    x: number;
    y: number;
    radius: number;
    color: string;
    circle: number
}

export const Cell: React.FC<CellProps> = ({ cell, cellPostion }) => {
    const circle = (window.innerWidth / 3)
    // const randomColor = require("randomcolor");

    return (
        <CellBlock
            key={cell._id}
            onClick={() => {
                // let color = randomColor();
                deleteFromBoard({
                    id: cell._id
                });
            }}
            x={cell.x}
            y={cell.y}
            color={cell.data.color}
            radius={cellPostion}
            circle={circle}
        />
    );
}

const CellBlock = styled.div<CellBlockProps>`
  position: absolute;
  left:  50%;
  top: 50%;
  width: ${({ circle }) => circle / 10}px;
  height: ${({ circle }) => circle / 10}px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  transform:  rotate(${({ radius }) => radius}deg) translate(${({ circle }) => circle / 2}px);
  transition: all ease-in-out 0.3s;
  &:hover{
    width: ${({ circle }) => circle / 9}px;
    height:${({ circle }) => circle / 9}px;
    border: 2px solid gray;

  }
`;
