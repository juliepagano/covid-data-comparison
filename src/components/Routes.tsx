import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";

const Routes = () => {
  return (
    <Router>
      <Route path="/">
        <App />
      </Route>
    </Router>
  );
};
export default Routes;
