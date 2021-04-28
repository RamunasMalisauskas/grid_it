import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CellDataType, CellHistory } from "../../types/types";
import { deleteFromBoard } from "../../apis/delete";
import { fetchCellStatus } from "../../apis";

interface CellProps {
  cell: CellDataType;
  cellRadiusIncr: number;
  valueSum: number;
  valueDif: number;
  circleSize: number;
}

type CellBlockProps = {
  key: string;
  onClick: () => void;
  radius: number;
  size: number;
  color: string;
  circleSize: number;
  offset: number;
};

type CellInfoProps = {
  visible: boolean;
  size: number;
  radius: number;
};

export const Cell: React.FC<CellProps> = ({
  cell,
  cellRadiusIncr,
  valueSum,
  valueDif,
  circleSize,
}: CellProps) => {
  const [historyData, setHistoryData] = useState([]);
  const [visible, setVisible] = useState(false);
  const { cellSize, cellOffset, cellcircleSize } = useMemo(() => {
    const cellProportion = (cell.data.data.value / valueSum) * 100;
    const cellSize = circleSize / 10 + cellProportion;
    const cellOffset = isNaN(valueDif) ? 0 : valueDif + cellProportion * 0.1;
    const cellcircleSize = circleSize + cellProportion;
    return {
      cellSize,
      cellOffset,
      cellcircleSize,
    };
  }, [cell.data.data.value, valueSum, circleSize, valueDif]);

  useEffect(() => {
    fetchCellStatus(cell._id).then((response) => {
      setHistoryData(response.history);
    });
  }, [cell]);

  const handelClick = () => {
    // deleteFromBoard({ cellId: cell._id })
  };
  const handleMouse = () => setVisible(!visible);

  return (
    <CellBlock
      key={`cell_ID_ ${cell._id}`}
      onClick={handelClick}
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
      color={cell.data.color}
      radius={cellRadiusIncr}
      circleSize={cellcircleSize}
      size={cellSize}
      offset={cellOffset}
    >
      <CellInfo visible={visible} size={circleSize} radius={cellRadiusIncr}>
        <p>
          number: <br /> {cell.x % 2000}
        </p>
        <p>
          value: <br /> {cell.data.data.value}
        </p>
        historic value:
        {historyData &&
          historyData.map((oldCell: CellHistory, index) => (
            <p key={`Cell_Old_ID_${oldCell.createdAt}_${index}`}>
              {oldCell.data.value}
            </p>
          ))}
      </CellInfo>
    </CellBlock>
  );
};

const CellBlock = styled.div<CellBlockProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  margin: -${({ offset }) => 5.6 + offset}%;
  background-color: ${({ color }) => color};
  transform: rotate(${({ radius }) => radius}deg)
    translateX(${({ circleSize, size }) => (circleSize + size / 2) / 2}px)
    translateY(${({ offset }) => -offset}%)
    rotate(${({ radius }) => -radius}deg);
  transition: all ease-in-out 0.3s;
  &:hover {
    width: ${({ size }) => size * 1.1}px;
    height: ${({ size }) => size * 1.1}px;
    box-shadow: 2px 5px 3px 2px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

const CellInfo = styled.div<CellInfoProps>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  top: 50%;
  left: -50%;
  transform: rotate(${({ radius }) => radius}deg)
    rotate(${({ radius }) => -radius}deg) translate(-25%, -50%);
  z-index: 200;
  background-color: rgba(209, 209, 209, 0.4);
  padding: 10px;
  font-family: "Zen Dots", cursive;
  text-transform: uppercase;
  border-radius: 10px;
  max-width: 100px;
`;
