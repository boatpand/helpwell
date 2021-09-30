import React from 'react'
import './App.css';
import { BrowserRouter as Router , Switch , Route, Link } from 'react-router-dom';
import Signin from './signin/signin';
import Helper from './helper/helper';
import Header_Vic from './victim/header_vic';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Header_Vic}/>
          <Route path="/helper" component={Helper}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
