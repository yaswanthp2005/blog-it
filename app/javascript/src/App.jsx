import routes from "constants/routes";

import React from "react";

import Posts from "components/Posts";
import { QueryClientProvider } from "react-query";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import queryClient from "utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Posts} path={routes.posts.index} />
        <Redirect exact from={routes.root} to={routes.posts.index} />
        <Redirect to={routes.posts.index} />
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default App;
