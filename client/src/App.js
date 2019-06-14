import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Customers from './components/customers/customers';
import Login from './pages/login';
import Register from './pages/register';
import Overview from './pages/overview';
import Profile from './pages/profile';
import Results from './pages/results';

function App() {
  return (
    <div className="App">
      <div class="pages">
        <Login />
        <Register />
        <Overview />
        <Profile />
        <Results />
      </div>
    </div>
  );
}

export default App;
