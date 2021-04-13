import React from 'react'
import styled from "styled-components";
import { canvaDataType } from '../apis/get'
import { addToBoard } from "../apis/post";

const randomColor = require("randomcolor");

interface CellProps {
    cell: canvaDataType
}

type CellBlockProps = {
    key: string;
    onClick: () => void;
    left: number;
    top: number;
    color: string;
}

export const Cell: React.FC<CellProps> = ({ cell }) => {
    return (
        <CellBlock
            key={cell._id}
            onClick={() => {
                let color = randomColor();
                addToBoard({
                    userName: cell.data.name,
                    userColor: color,
                    x: cell.x,
                    y: cell.y,
                });
            }}
            left={cell.x}
            top={cell.y}
            color={cell.data.color}
        />
    );
}

const CellBlock = styled.div<CellBlockProps>`
  position: absolute;
  left:  ${(props) => 50 - (props.left)}%;
  top: ${(props) => 50 - (props.top)}%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
