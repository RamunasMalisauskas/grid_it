import { combineReducers } from "redux";
import { storageItems } from "../constants/stateConstants";

import {
  SET_USER_NAME,
  SET_CANVAS_DATA,
  SET_SIDEBAR,
  SET_LOGIN,
  SET_CANVAS_POSITION,
  SET_ERROR_MESSAGE,
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

const userName = localStorage.getItem(storageItems.name);

const defaultState = {
  errorMsg: "",
  name: userName || "user",
  sideBarState: "close",
  login: "loggedOut",
  loginMenu: false,
  canvasPosition: { x: 2000, y: 2000 },
};

const appData = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, name: action.value };
    case SET_CANVAS_DATA:
      return { ...state, canvasData: action.value };
    case SET_CANVAS_POSITION:
      return { ...state, canvasPosition: action.value };
    case SET_SIDEBAR:
      return { ...state, sideBarState: action.value };
    case SET_LOGIN:
      return { ...state, login: action.value };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMsg: action.value };
    default:
      return state;
  }
};

export const combinedReducer = combineReducers({
  appData: appData,
});
