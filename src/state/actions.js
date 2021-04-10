import { SET_CIRCLE_COLOR, SET_USER_NAME, SET_CANVAS_DATA } from "./constant";

//   export type PainterAction = {
//     type: string;
//     value: string;
//   };

export const setCircleColor = (value) => {
  return {
    type: SET_CIRCLE_COLOR,
    value,
  };
};

export const setUserName = (value) => {
  return {
    type: SET_USER_NAME,
    value,
  };
};

export const setCanvasData = (value) => {
  return {
    type: SET_CANVAS_DATA,
    value,
  };
};
