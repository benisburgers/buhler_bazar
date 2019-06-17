// import Customers from './components/customers/customers';
import React, { Component } from 'react';
import './App.css';

import Login from './pages/login';
import Register from './pages/register';
import Overview from './pages/overview';
import Profile from './pages/profile';
import Results from './pages/results';

class App extends Component {

  render() {

    return (
      <div className="App">
        <ul>
          <li><Login /></li>
          <li><Register /></li>
          <li><Overview /></li>
          <li><Profile /></li>
          <li><Results /></li>
        </ul>
      </div>
    );
  }
}

export default App;
