import { combineReducers } from "redux";
import { ActionTypes } from "./constant";
import {
  StateType,
  ActionType,
  storageItems,
  log,
  menuState,
  sideBarContentState,
  error,
} from "../types/types";

const userName = localStorage.getItem(storageItems.name);

const initialState: StateType = {
  appState: {
    errorMsg: error.empty || "",
    loading: false,
    sideBar: menuState.close || "close",
    sideBarContent: sideBarContentState.addCell || "addcell",
    classMenu: menuState.close || "close",
    resetMenu: menuState.close || "close",
  },
  canvaState: {
    dataLimit: false,
    canvasData: [],
    canvasPosition: { x: 2000, y: 2000 },
    classData: [],
    className: "grid it",
  },
  userState: {
    userName: userName || "user",
    loginStatus: log.out || "loggedOut",
  },
};

const appState = (state = initialState.appState, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.SET_SIDEBAR:
      return { ...state, sideBar: action.value };
    case ActionTypes.SET_SIDEBAR_CONTENT:
      return { ...state, sideBarContent: action.value };
    case ActionTypes.SET_ERROR_MESSAGE:
      return { ...state, errorMsg: action.value };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.value };
    case ActionTypes.SET_CLASS_MENU:
      return { ...state, classMenu: action.value };
    case ActionTypes.SET_RESSET_MENU:
      return { ...state, resetMenu: action.value };
    default:
      return state;
  }
};

const canvaState = (state = initialState.canvaState, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.SET_CANVAS_DATA:
      return { ...state, canvasData: action.value };
    case ActionTypes.SET_CANVAS_POSITION:
      return { ...state, canvasPosition: action.value };
    case ActionTypes.SET_DATA_LIMIT:
      return { ...state, dataLimit: action.value };
    case ActionTypes.SET_CLASS_DATA:
      return { ...state, classData: action.value };
    case ActionTypes.SET_CLASS_NAME:
      return { ...state, className: action.value };
    default:
      return state;
  }
};

const userState = (state = initialState.userState, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.SET_USER_NAME:
      return { ...state, userName: action.value };
    case ActionTypes.SET_LOGIN:
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
