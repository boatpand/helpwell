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
import SignupVictim2 from './signin/signupvictim2';
import SignupHelper2 from './signin/signuphelper2';
import VictimOtp from './signin/victim-otp';
import HelperOtp from './signin/helper-otp';
import Forgetpass from './signin/forgetpass';

import Help from "./victim/Help";
import Summary from "./victim/Summary";
import HelperMap from './helper/helpermap';
import HelperProfile from './helper/helperprofile';
import HelperEditProfile from './helper/helpereditprofile';
import Header_admin from './admin/Header_admin';
import Maps_admin from './admin/Map_admin';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>

          <Route exact path="/" component={Signin}/>
           <Route exact path="/helper"  component={Helper}/>
          <Route exact path="/accept-request/:id" component={EventDetail}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/forget-pass" component={Forgetpass}/>
          <Route exact path="/signup-victim" component={SignupVictim}/>
          <Route exact path="/signup-victim2" component={SignupVictim2}/>
          <Route exact path="/victim-otp" component={VictimOtp}/>
          <Route exact path="/helpertype" component={HelperType}/>
          <Route exact path="/individual" component={Individual}/>
          <Route exact path="/organization" component={Organization}/>
          <Route exact path="/signup-helper2" component={SignupHelper2}/>
          <Route exact path="/helper-otp" component={HelperOtp}/>
          <Route exact path="/helpermap" component={HelperMap}/>
          <Route exact path="/helperprofile/:mobile" component={HelperProfile}/>
          <Route exact path="/helperprofile/edit-profile/:mobile" component={HelperEditProfile}/>
          <Route exact path="/victims" component={Help} />
          <Route exact path="/victims/summary" component={Summary} />
          <Route exact path="/victims/map" component={Summary} />
          <Route exact path="/victims/profile" component={Summary} />
          <Route exact path="/admin" component={Maps_admin}/>
          <Route exact path="/admin/database" component={Header_admin} />
          <Route exact path="/admin/map" component={Maps_admin} />
          <Route exact path="/admin/information" component={Maps_admin} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
