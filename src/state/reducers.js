import { combineReducers } from "redux";

import {
  SET_CIRCLE_COLOR,
  SET_USER_NAME,
  SET_CANVAS_DATA,
  SET_SIDEBAR,
} from "./constant";

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

const defaultState = {
  name: "user",
  color: "#f44336",
  sideBarState: "close",
};

const appData = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CIRCLE_COLOR:
      return { ...state, color: action.value };
    case SET_USER_NAME:
      return { ...state, name: action.value };
    case SET_CANVAS_DATA:
      return { ...state, canvasData: action.value };
    case SET_SIDEBAR: {
      return { ...state, sideBarState: action.value };
    }
    default:
      return state;
  }
};

export const combinedReducer = combineReducers({
  appData: appData,
});
