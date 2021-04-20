import { combineReducers } from "redux";

import {
  SET_USER_NAME,
  SET_CANVAS_DATA,
  SET_SIDEBAR,
  SET_LOGIN,
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
  sideBarState: "close",
  login: "loggedOut",
  loginMenu: false,
};

const appData = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, name: action.value };
    case SET_CANVAS_DATA:
      return { ...state, canvasData: action.value };
    case SET_SIDEBAR:
      return { ...state, sideBarState: action.value };
    case SET_LOGIN:
      return { ...state, login: action.value };
    default:
      return state;
  }
};

export const combinedReducer = combineReducers({
  appData: appData,
});
