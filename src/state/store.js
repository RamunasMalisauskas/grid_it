import { createStore } from "redux";
import { combinedReducer } from "./reducers";
import { devToolsEnhancer } from 'redux-devtools-extension';

const initialState = {}

export const store = createStore(combinedReducer, initialState, devToolsEnhancer({}));
