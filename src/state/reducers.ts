import { combineReducers } from "redux";
import {
  StateType,
  ActionType,
  storageItems,
  log,
  sideBarState,
} from "../types/types";
import {
  SET_USER_NAME,
  SET_CANVAS_DATA,
  SET_SIDEBAR,
  SET_LOGIN,
  SET_CANVAS_POSITION,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_DATA_LIMIT,
} from "./constant";

const userName = localStorage.getItem(storageItems.name);

const initialState: StateType = {
  appState: {
    errorMsg: "",
    loading: false,
    sideBar: sideBarState.close,
  },
  canvaState: {
    dataLimit: false,
    canvasData: [],
    canvasPosition: { x: 2000, y: 2000 },
  },
  userState: {
    userName: userName || "user",
    loginStatus: log.out,
  },
};

const appState = (state = initialState.appState, action: ActionType) => {
  switch (action.type) {
    case SET_SIDEBAR:
      return { ...state, sideBar: action.value };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMsg: action.value };
    case SET_LOADING:
      return { ...state, loading: action.value };
    default:
      return state;
  }
};

const canvaState = (state = initialState.canvaState, action: ActionType) => {
  switch (action.type) {
    case SET_CANVAS_DATA:
      return { ...state, canvasData: action.value };
    case SET_CANVAS_POSITION:
      return { ...state, canvasPosition: action.value };
    case SET_DATA_LIMIT:
      return { ...state, dataLimit: action.value };
    default:
      return state;
  }
};

const userState = (state = initialState.userState, action: ActionType) => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.value };
    case SET_LOGIN:
      return { ...state, loginStatus: action.value };
    default:
      return state;
  }
};
export const combinedReducer = combineReducers({
  appState,
  userState,
  canvaState,
});
