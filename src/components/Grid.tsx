import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Cell } from '../components'
import { canvaDataType } from '../apis/get'



type BoardDataState = {
  userData: {
    canvasData: canvaDataType[]
  }
}
// *** TO DO ***
//  rethink data visualisation/ position on canvas (top left rigth bottom)
// create proff of concept !!!
export const Grid: React.FC = () => {
  const canvasData = useSelector((state: BoardDataState) => state.userData.canvasData);


  console.log(canvasData)

  return (
    <Canvas>
      {canvasData &&
        canvasData.map((cell) => (
          <Cell key={cell._id} cell={cell} />
        ))}
    </Canvas>
  );
};

const Canvas = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: gray;
`;
