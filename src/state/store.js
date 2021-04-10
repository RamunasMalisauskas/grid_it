import { createStore } from "redux";
import { combinedReducer } from "./reducers";

const initialState = {}

export const store = createStore(combinedReducer, initialState);
