import React from 'react'
import styled from "styled-components";
import { CellDataType } from '../apis/get'
import { deleteFromBoard } from "../apis/delete";

interface CellProps {
    cell: CellDataType
    cellRadiusIncr: number
    valueSum: number
    valueDif: number
    circleSize: number
}

type CellBlockProps = {
    key: string;
    onClick: () => void;
    radius: number;
    size: number;
    color: string;
    circleSize: number;
    offset: number;
}

export const Cell: React.FC<CellProps> = ({ cell, cellRadiusIncr, valueSum, valueDif, circleSize }) => {
    // each cell portion in 100%
    const cellProportion = cell.data.data.value / valueSum * 100
    // cell size determed by is proportion of overall data plus minimum constant size
    const cellSize = circleSize / 10 + cellProportion
    // setting offset by value between cells and proportion size in %
    const cellOffset = isNaN(valueDif) ? 0 : valueDif + (cellProportion * 0.1)

    const cellcircleSize = circleSize + cellProportion


    return (
        <CellBlock
            key={cell._id}
            onClick={() => {
                deleteFromBoard({
                    id: cell._id
                });
            }}
            color={cell.data.color}
            radius={cellRadiusIncr}
            circleSize={cellcircleSize}
            size={cellSize}
            offset={cellOffset}
        />
    );
}

const CellBlock = styled.div<CellBlockProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  margin: -${({ offset }) => 5.6 + offset}%;
  background-color: ${({ color }) => color};
  transform:  
            rotate(${({ radius }) => radius}deg) 
            translateX(${({ circleSize, size }) => (circleSize + (size / 2)) / 2}px)
            translateY(${({ offset }) => -offset}%)
            ;
  transition: all ease-in-out 0.3s;
  &:hover{
    width: ${({ size }) => size * 1.1}px;
    height:${({ size }) => size * 1.1}px;
    box-shadow: 2px 5px 3px 2px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;
