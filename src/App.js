import React, { useEffect, useMemo, useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCanvaData, fetchBoardStatus } from "./apis";
import { setCanvasData } from "./state/actions";
import { HomePage } from "./containers";

const App = () => {
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.appData.canvasPosition);
  const build = useMemo(() => ({ version: 0 }), []);

  useEffect(() => {
    buildVersion();
  });

  const buildVersion = useCallback(() => {
    setInterval(() => {
      fetchBoardStatus().then((newVersion) => {
        if (build.version < newVersion) {
          console.log("new build version is avalible");
          build.version = newVersion;
          fetchCanvaData({
            xposition: canvas[0],
            yposition: canvas[1],
          }).then((result) => {
            dispatch(setCanvasData(result));
          });
        }
      });
    }, 1000);
  }, [build, dispatch, canvas]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
