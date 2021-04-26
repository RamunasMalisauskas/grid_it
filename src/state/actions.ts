import {
  SET_USER_NAME,
  SET_CANVAS_DATA,
  SET_SIDEBAR,
  SET_LOGIN,
  SET_CANVAS_POSITION,
  SET_ERROR_MESSAGE
} from "./constant";

import { ActionType } from '../types/types'

export const setUserName = (value: string): ActionType => {
  return {
    type: SET_USER_NAME,
    value,
  };
};

export const setCanvasData = (value: []): ActionType => {
  return {
    type: SET_CANVAS_DATA,
    value,
  };
};

export const setCanvasPosition = (value: {}): ActionType => {
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

