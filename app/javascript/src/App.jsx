import routes from "constants/routes";

import React from "react";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Posts from "components/Posts";
import CreatePost from "components/Posts/Create";
import EditPost from "components/Posts/Edit";
import MyPosts from "components/Posts/MyPosts";
import ShowPost from "components/Posts/Show";
import { QueryClientProvider } from "react-query";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import queryClient from "utils/queryClient";
import { getFromLocalStorage } from "utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = Boolean(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={Login} path={routes.login} />
          <Route exact component={Signup} path={routes.signup} />
          <PrivateRoute
            exact
            component={Posts}
            condition={isLoggedIn}
            path={routes.posts.index}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            exact
            component={CreatePost}
            condition={isLoggedIn}
            path={routes.posts.create}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            exact
            component={EditPost}
            condition={isLoggedIn}
            path={routes.posts.edit}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            exact
            component={MyPosts}
            condition={isLoggedIn}
            path={routes.posts.mine}
            redirectRoute={routes.login}
          />
          <PrivateRoute
            exact
            component={ShowPost}
            condition={isLoggedIn}
            path={routes.posts.show}
            redirectRoute={routes.login}
          />
          <Redirect exact from={routes.root} to={routes.posts.index} />
          <Redirect to={routes.posts.index} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
