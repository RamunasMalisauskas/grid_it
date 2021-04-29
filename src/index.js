import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
