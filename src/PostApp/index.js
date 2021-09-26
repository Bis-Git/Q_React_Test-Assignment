import React from "react";
import { useGreeter } from "./useGreeter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./PostList";
import PostDetails from "./PostDetails";

const ReactRouterSetup = () => {
  useGreeter("ReactRouterSetup");

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/post/:id" children={<PostDetails />}></Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
