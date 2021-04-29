import { ActionTypes } from "./constant";

import {
  ActionType,
  CellDataType,
  CanvasPosition,
  ClassType,
} from "../types/types";

export const setUserName = (value: string): ActionType => {
  return {
    type: ActionTypes.SET_USER_NAME,
    value,
  };
};

export const setCanvasData = (value: CellDataType[]): ActionType => {
  return {
    type: ActionTypes.SET_CANVAS_DATA,
    value,
  };
};

export const setCanvasPosition = (value: CanvasPosition): ActionType => {
  return {
    type: ActionTypes.SET_CANVAS_POSITION,
    value,
  };
};

export const setSideBar = (value: string): ActionType => {
  return {
    type: ActionTypes.SET_SIDEBAR,
    value,
  };
};

export const setSideBarContent = (value: string): ActionType => {
  return {
    type: ActionTypes.SET_SIDEBAR_CONTENT,
    value,
  };
};

export const setLogin = (value: string): ActionType => {
  return {
    type: ActionTypes.SET_LOGIN,
    value,
  };
};

export const setErrorMsg = (value: string): ActionType => {
  return {
    type: ActionTypes.SET_ERROR_MESSAGE,
    value,
  };
};

export const setLoading = (value: boolean): ActionType => {
  return {
    type: ActionTypes.SET_LOADING,
    value,
  };
};

export const setDataLimit = (value: boolean): ActionType => {
  return {
    type: ActionTypes.SET_DATA_LIMIT,
    value,
  };
};

export const setClassData = (value: ClassType[]): ActionType => {
  return {
    type: ActionTypes.SET_CLASS_DATA,
    value,
  };
};
export const setClassName = (value: string): ActionType => {
  return {
    type: ActionTypes.SET_CLASS_NAME,
    value,
  };
};

export const setClassMenu = (value: string): ActionType => {
  return {
    type: ActionTypes.SET_CLASS_MENU,
    value,
  };
};

export const setResetMenu = (value: string): ActionType => {
  return {
    type: ActionTypes.SET_RESSET_MENU,
    value,
  };
};
