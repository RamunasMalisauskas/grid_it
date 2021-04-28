import {
  SET_USER_NAME,
  SET_CANVAS_DATA,
  SET_SIDEBAR,
  SET_LOGIN,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_DATA_LIMIT,
  SET_CANVAS_POSITION,
  SET_SIDEBAR_CONTENT,
  SET_CLASS_DATA,
  SET_CLASS_MENU,
} from "./constant";

import {
  ActionType,
  CellDataType,
  CanvasPosition,
  ClassType,
} from "../types/types";

export const setUserName = (value: string): ActionType => {
  return {
    type: SET_USER_NAME,
    value,
  };
};

export const setCanvasData = (value: CellDataType[]): ActionType => {
  return {
    type: SET_CANVAS_DATA,
    value,
  };
};

export const setCanvasPosition = (value: CanvasPosition): ActionType => {
  return {
    type: SET_CANVAS_POSITION,
    value,
  };
};

export const setSideBar = (value: string): ActionType => {
  return {
    type: SET_SIDEBAR,
    value,
  };
};

export const setSideBarContent = (value: string): ActionType => {
  return {
    type: SET_SIDEBAR_CONTENT,
    value,
  };
};

export const setLogin = (value: string): ActionType => {
  return {
    type: SET_LOGIN,
    value,
  };
};
export const setErrorMsg = (value: string): ActionType => {
  return {
    type: SET_ERROR_MESSAGE,
    value,
  };
};
export const setLoading = (value: boolean): ActionType => {
  return {
    type: SET_LOADING,
    value,
  };
};
export const setDataLimit = (value: boolean): ActionType => {
  return {
    type: SET_DATA_LIMIT,
    value,
  };
};
export const setClassData = (value: ClassType[]): ActionType => {
  return {
    type: SET_CLASS_DATA,
    value,
  };
};
export const setClassMenu = (value: string): ActionType => {
  return {
    type: SET_CLASS_MENU,
    value,
  };
};
