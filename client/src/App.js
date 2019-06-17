import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import Customers from './components/customers/customers';
import Login from './pages/login';
import Register from './pages/register';
import Overview from './pages/overview';
import Profile from './pages/profile';
import Results from './pages/results';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to={'/login'}>Login</Link></li>
          <li><Link to={'/register'}>Register</Link></li>
          <li><Link to={'/overview'}>Overview</Link></li>
          <li><Link to={'/profile'}>Profile</Link></li>
          <li><Link to={'/results'}>Results</Link></li>
        </ul>
      </nav>
      <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/overview' component={Overview} />
          <Route path='/profile' component={Profile} />
          <Route path='/results' component={Results} />
      </Switch>
    </div>
  );
}

export default App;
