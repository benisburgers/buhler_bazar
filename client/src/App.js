// import Customers from './components/customers/customers';
import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Overview from './pages/overview';
import Profile from './pages/profile';
import Results from './pages/results';

class App extends Component {

  state = {
    joke: "lol"
  }

  render() {

    return (
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li><Link to={'/'}>Login</Link></li>
              <li><Link to={'/register'}>Register</Link></li>
              <li><Link to={'/overview'}>Overview</Link></li>
              <li><Link to={'/profile'}>Profile</Link></li>
              <li><Link to={'/results'}>Results</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={ () => <Login joke={this.state.joke} /> } />
            <Route exact path="/register" component={ () => <Register joke={this.state.joke} /> } />
            <Route exact path="/overview" component={ () => <Overview joke={this.state.joke} /> } />
            <Route exact path="/profile" component={ () => <Profile joke={this.state.joke} /> } />
            <Route exact path="/results" component={ () => <Results joke={this.state.joke} /> } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
