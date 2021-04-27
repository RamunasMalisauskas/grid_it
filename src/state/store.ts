import { createStore, Store } from "redux";
import { combinedReducer } from "./reducers";
import { devToolsEnhancer } from "redux-devtools-extension";

const initialState = {};

export const store: Store = createStore(
  combinedReducer,
  initialState,
  devToolsEnhancer({})
);
