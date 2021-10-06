import './App.css';
import { BrowserRouter as Router , Switch , Route, Link } from 'react-router-dom';
import Signin from './signin/signin';
import Signup from './signin/signup';
import Helper from './helper/helper';
import EventDetail from './helper/eventdetail';
import SignupVictim from './signin/signupvictim';
import HelperType from './signin/helpertype';
import Individual from './signin/individual';
import Organization from './signin/organization';
import Helps from "./victim/Help";
import Summary from "./victim/Summary";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Signin}/>
          <Route path="/helper" component={Helper}/>
          <Route path="/event-detail/:id" component={EventDetail}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signup-victim" component={SignupVictim}/>
          <Route path="/helpertype" component={HelperType}/>
          <Route path="/individual" component={Individual}/>
          <Route path="/organization" component={Organization}/>
          <Route exact path="/victims" component={Helps} />
          <Route exact path="/victims/summary" component={Summary} />
          <Route exact path="/victims" component={Helps} />
          <Route exact path="/victims/summary" component={Summary} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
