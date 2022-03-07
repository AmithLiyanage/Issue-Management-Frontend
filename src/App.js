import React from "react";
import { Route, Router } from "react-router-dom";
import Routes from "./routes";
import Home from "./components/Home";
import { Switch } from "@mui/material";
import FilteredIssueList from "./components/FilteredIssueList.js";

const App = () => {
  return <Routes />;

  // return (
  //   <Router>
  //     <Switch>
  //       <Route exact path="/home" component={Home} />
  //       <Route exact path="/filteredIssueList" component={FilteredIssueList} />
  //     </Switch>
  //   </Router>
  // )
};

export default App;
