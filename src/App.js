import React, { useEffect, useState, useMemo } from "react";
import { fetchBoardCanva, addToBoard, fetchBoardStatus } from "./apis";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { homePage } from "./views";
import { BoardProvider } from "./context";

const App = () => {
  const [data, setData] = useState();
  const build = useMemo(() => ({ version: 0 }), []);

  useEffect(() => {
    fetchBoardCanva().then((result) => setData(result));
  }, []);
  // console.log(data);

  const BuildVersion = () => {
    fetchBoardStatus().then((newVersion) => {
      if (build.version < newVersion) {
        console.log("new version is avalible");
        // build.version = newVersion;
        fetchBoardCanva().then((result) => setData(result));
      }
    });
  };
  // BuildVersion();

  // addToBoard({ userName: "rami", userColor: "orange", x: 1017, y: 1005 });

  return (
    <BoardProvider boardData={data}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={homePage} />
        </Switch>
      </BrowserRouter>
    </BoardProvider>
  );
};

export default App;
