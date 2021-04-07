import React, { useEffect, useState, useMemo } from "react";
import { fetchBoardCanva, fetchBoardStatus } from "./apis";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./views";
import { BoardProvider } from "./context";

const App = () => {
  const [data, setData] = useState();
  const build = useMemo(() => ({ version: 0 }), []);

  const BuildVersion = () => {
    setInterval(() => {
      fetchBoardStatus().then((newVersion) => {
        if (build.version < newVersion) {
          console.log("new build version is avalible");
          build.version = newVersion;
          fetchBoardCanva().then((result) => setData(result));
        }
      });
    }, 1000);
  };

  useEffect(() => {
    fetchBoardCanva().then((result) => setData(result));
    BuildVersion();
  }, []);

  return (
    <BoardProvider boardData={data}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </BoardProvider>
  );
};

export default App;
