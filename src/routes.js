import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import Home from "./components/Home";
import { useSelector } from "react-redux";

const AuthIsLoaded = ({ children }) => {
  const authenticated = useSelector(
    ({ authData: { authenticated } }) => authenticated
  );
  const loading = useSelector(({ authData: { loading } }) => loading);

  if (authenticated && !loading) return children;

  if (!authenticated && !loading) return children;

  return "Loading";
};

const Routes = () => {
  return (
    <Router>
      <AuthIsLoaded>
        <Switch>
          <Route exact path={"/"} element={<Home />} />
        </Switch>
      </AuthIsLoaded>
    </Router>
  );
};

export default Routes;
