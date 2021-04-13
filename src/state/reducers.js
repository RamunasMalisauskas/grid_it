import { combineReducers } from "redux";

import { SET_CIRCLE_COLOR, SET_USER_NAME, SET_CANVAS_DATA } from "./constant";

//   export type PainterData = {
//     name: string;
//     color: string;
//     radius: string;
//   };

//   export type AppState = {
//     painterData: PainterData;
//   };

// const painterName = localStorage.getItem("painterName");
// const painterColor = localStorage.getItem("painterColor");

const InitialState = {
  name: "user",
  color: "#f44336",
};

const appData = (state = InitialState, action) => {
  switch (action.type) {
    case SET_CIRCLE_COLOR:
      return { ...state, color: action.value };
    case SET_USER_NAME:
      return { ...state, name: action.value };
    case SET_CANVAS_DATA:
      return { ...state, canvasData: action.value };
    default:
      return state;
  }
};

export const combinedReducer = combineReducers({
  appData: appData,
});
