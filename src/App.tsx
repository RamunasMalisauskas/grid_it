import React, { useEffect, useMemo, useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCanvaData, fetchBoardStatus } from "./apis";
import { setCanvasData, setErrorMsg, setDataLimit } from "./state/actions";
import { HomePage, UserPage } from "./containers";
import { PrivateRoute } from "./components";
import { StateType, error } from "./types/types";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { canvasPosition } = useSelector(
    (state: StateType) => state.canvaState
  );

  const build = useMemo(() => ({ version: 0 }), []);

  const buildVersion = useCallback(() => {
    setInterval(async () => {
      const newVersion = await fetchBoardStatus();
      if (!newVersion) return;
      if (build.version < newVersion) {
        build.version = newVersion;
        const canvasData = await fetchCanvaData({
          xposition: canvasPosition.x,
          yposition: canvasPosition.y,
        });
        if (canvasData) {
          if (
            canvasData.length === 0 ||
            canvasData[0].data === null ||
            !canvasData[0].data.data.value
          ) {
            dispatch(setErrorMsg(error.noData));
            dispatch(setCanvasData([]));
            return;
          }
          if (canvasData.length <= 8 && canvasData.length > 0) {
            dispatch(setErrorMsg(error.empty));
          }
          if (canvasData.length > 8) {
            dispatch(setErrorMsg(error.allmostMax));
            dispatch(setDataLimit(false));
          }
          if (canvasData.length > 10) {
            dispatch(setErrorMsg(error.maxCells));
            dispatch(setDataLimit(true));
          }
          dispatch(setCanvasData(canvasData));
        }
      }
    }, 1000);
  }, []);

  useEffect(() => {
    buildVersion();
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/user/:id" component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
