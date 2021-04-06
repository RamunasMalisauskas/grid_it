import React, { useEffect, useState } from "react";
import { fetchBoardCanva } from "./apis/get";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { homePage } from "./views";
import { BoardProvider } from "./context";

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchBoardCanva().then((result) => setData(result));
  }, []);

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
