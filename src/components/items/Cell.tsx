import React, { useState } from 'react'
import styled from "styled-components";
import { CellDataType } from '../../types/types'
import { deleteFromBoard } from "../../apis/delete";

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
type CellInfoProps = {
    visible: boolean
}

export const Cell: React.FC<CellProps> = ({ cell, cellRadiusIncr, valueSum, valueDif, circleSize }) => {
    const [visible, setVisible] = useState(false)
    const cellProportion = cell.data.data.value / valueSum * 100
    const cellSize = circleSize / 10 + cellProportion
    const cellOffset = isNaN(valueDif) ? 0 : valueDif + (cellProportion * 0.1)
    const cellcircleSize = circleSize + cellProportion

    const handelClick = () => deleteFromBoard({ id: cell._id })
    const handleMouse = () => setVisible(!visible)

    return (
        <CellBlock
            key={cell._id}
            onClick={handelClick}
            onMouseEnter={handleMouse}
            onMouseLeave={handleMouse}
            color={cell.data.color}
            radius={cellRadiusIncr}
            circleSize={cellcircleSize}
            size={cellSize}
            offset={cellOffset}
        >
            <CellInfo visible={visible}>
                {cell.data.data.value}
            </CellInfo>
        </CellBlock>
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
            rotate(${({ radius }) => -radius}deg) 
            ;
  transition: all ease-in-out 0.3s;
  &:hover{
    width: ${({ size }) => size * 1.1}px;
    height:${({ size }) => size * 1.1}px;
    box-shadow: 2px 5px 3px 2px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

const CellInfo = styled.div<CellInfoProps>`
 display: ${({ visible }) => visible ? "block" : "none"};
 position: absolute;
 top: 50%;
 left: -50%;
 transform: translate(-50%, -50%);
 background-color: rgba(209, 209, 209, 0.4);
 padding: 20px;
 font-family: 'Zen Dots', cursive;
 text-transform: uppercase;
 border-radius: 10px;
`
