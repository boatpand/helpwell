import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signin from "./signin/signin";
import Helper from "./helper/helper";
import Helps from "./victim/Help";
import Summary from "./victim/Summary";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/helper" component={Helper} />
          <Route exact path="/victims" component={Helps} />
          <Route exact path="/victims/summary" component={Summary} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
