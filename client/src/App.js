import React from "react";
import FileUpload from "./components/FileUpload/FileUpload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <FileUpload />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
