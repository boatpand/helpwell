import './App.css';
import { BrowserRouter as Router , Switch , Route, Link } from 'react-router-dom';
import Signin from './signin/signin';
import Helper from './helper/helper';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Signin}/>
          <Route path="/helper" component={Helper}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
