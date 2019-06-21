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
    joke: "lol",
    user: {
      data: {
        //get from userList
        id: 1,
        admin: false,
        firstName: "Marko",
        lastName: "Lukac",
        email: "marko@buehler-buehler.ch",
        picturePath: "/marko69.jpg",
      },
      order: {
        //get from userOrderTable_Marko
        lastOrderDate: "2019-06-21T13:46:03.995Z",
        lastOrder: [1, 2, 3],
        favoriteProduct: 3
      }
    },
    fruits: [
      {
        id: 1,
        name: "Banane",
        type: "fruit",
        picturePath: "banane.jpeg"
      },
      {
        id: 2,
        name: "Apfel",
        type: "fruit",
        picturePath: "apfel.jpeg"
      },
      {
        id: 3,
        name: "Birre",
        type: "fruit",
        picturePath: "birre.jpeg"
      },
      {
        id: 4,
        name: "Pfirsich",
        type: "fruit",
        picturePath: "pfirsich.jpeg"
      },
      {
        id: 5,
        name: "Truube",
        type: "fruit",
        picturePath: "truube.jpeg"
      },
      {
        id: 6,
        name: "Avocado",
        type: "fruit",
        picturePath: "avocado.jpeg"
      }
    ]
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
            <Route exact path="/overview" component={ () => <Overview joke={this.state.joke} userinfo={this.state.user} fruits={this.state.fruits}/> } />
            <Route exact path="/profile" component={ () => <Profile joke={this.state.joke} /> } />
            <Route exact path="/results" component={ () => <Results joke={this.state.joke} /> } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
