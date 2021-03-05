import React from "react";
import FileUpload from "./components/FileUpload/FileUpload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Table from "./components/Table/Table";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/employees">
          <Table />
        </Route>
        <Route path="/">
          <FileUpload />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
