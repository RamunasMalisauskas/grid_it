import React, { useEffect, useMemo, useCallback } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCanvaData, fetchBoardStatus } from "./apis";
import { setCanvasData, setErrorMsg, setDataLimit } from "./state/actions";
import { HomePage, UserPage } from "./containers";
import { StateType } from "./types/types";
import { auth } from "./firebase";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { canvasPosition } = useSelector(
    (state: StateType) => state.canvaState
  );
  const build = useMemo(() => ({ version: 0 }), []);

  const buildVersion = useCallback(() => {
    setInterval(async () => {
      const newVersion = await fetchBoardStatus();
      // Ar reikia validaciojos cia ar ne nes yra await?
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
            return;
          }
          if (canvasData.length <= 8) {
            dispatch(setErrorMsg(""));
          }
          if (canvasData.length > 8) {
            dispatch(
              setErrorMsg("You're about to reach maximum capacity of cells")
            );
            dispatch(setDataLimit(false));
          }
          if (canvasData.length > 10) {
            dispatch(
              setErrorMsg(
                "maximum capacity of cells has been reached. Remove some of if"
              )
            );
            dispatch(setDataLimit(true));
          }
          dispatch(setCanvasData(canvasData));
        }
      }
    }, 1000);
  }, [build, dispatch, canvasPosition]);

  const PrivateRoute = ({
    children,
    ...props
  }: React.PropsWithChildren<RouteProps>): JSX.Element => {
    if (!auth.currentUser) return <Redirect to="" />;
    return <Route {...props}>{children}</Route>;
  };

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
