import React, { useEffect, useMemo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCanvaData, fetchBoardStatus } from "./apis";
import { setCanvasData } from "./state/actions";
import { HomePage } from "./containers";

const App = () => {
  const dispatch = useDispatch();
  const build = useMemo(() => ({ version: 0 }), []);

  useEffect(() => {
    BuildVersion();
  });

  const BuildVersion = () => {
    setInterval(() => {
      fetchBoardStatus().then((newVersion) => {
        if (build.version < newVersion) {
          console.log("new build version is avalible");
          build.version = newVersion;
          fetchCanvaData().then((result) => {
            dispatch(setCanvasData(result));
          });
        }
      });
    }, 1000);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
