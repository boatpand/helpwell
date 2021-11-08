import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signin from "./signin/signin";
import Signup from "./signin/signup";
import Helper from "./helper/helper";
import EventDetail from "./helper/eventdetail";
import SignupVictim from "./signin/signupvictim";
import HelperType from "./signin/helpertype";
import Individual from "./signin/individual";
import Organization from "./signin/organization";
import Helps from "./victim/Help";
import Summary from "./victim/Summary";
import SignupVictim2 from "./signin/signupvictim2";
import SignupHelper2 from "./signin/signuphelper2";
import VictimOtp from "./signin/victim-otp";
import HelperOtp from "./signin/helper-otp";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/helper" component={Helper} />
          <Route exact path="/accept-request/:id" component={EventDetail} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signup-victim" component={SignupVictim} />
          <Route exact path="/signup-victim2" component={SignupVictim2} />
          <Route exact path="/victim-otp" component={VictimOtp} />
          <Route exact path="/helpertype" component={HelperType} />
          <Route exact path="/individual" component={Individual} />
          <Route exact path="/organization" component={Organization} />
          <Route exact path="/signup-helper2" component={SignupHelper2} />
          <Route exact path="/helper-otp" component={HelperOtp} />
          <Route exact path="/victims" component={Helps} />
          <Route exact path="/victims/summary" component={Summary} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
