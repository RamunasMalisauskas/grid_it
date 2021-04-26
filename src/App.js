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

  const buildVersion = useCallback(() => {
    setInterval(async () => {
      const newVersion = await fetchBoardStatus();
      // Ar reikia validaciojos cia ar ne nes yra await?
      if (!newVersion) return;
      if (build.version < newVersion) {
        console.log("new build version is avalible");
        build.version = newVersion;
        const canvasData = await fetchCanvaData({
          xposition: canvas.x,
          yposition: canvas.y,
        });
        if (canvasData) {
          dispatch(setCanvasData(canvasData));
        }
      }
    }, 1000);
  }, [build, dispatch, canvas]);

  useEffect(() => {
    buildVersion();
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
