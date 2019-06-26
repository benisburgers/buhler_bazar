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
      //get from userList
      id: 1,
      admin: false,
      firstName: "Marko",
      lastName: "Lukac",
      email: "marko@buehler-buehler.ch",
      picturePath: "/marko69.jpg",
      //get from userOrderTable_Marko
      lastOrderDate: "2019-06-21T13:46:03.995Z",
      lastOrder: [1, 2, 3],
      favoriteProduct: 3
    },
    food: [
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
      },
      {
        id: 7,
        name: "Chips",
        type: "snack",
        picturePath: "chips.jpeg"
      },
      {
        id: 8,
        name: "Cashew",
        type: "snack",
        picturePath: "cashew.jpeg"
      },
      {
        id: 9,
        name: "Troche Ananas",
        type: "snack",
        picturePath: "trocheananas.jpeg"
      }
    ]
  }

  findProperItem(array, entry) {
    return(array.find(fruit => fruit.id === entry));
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
            <Route exact path="/register" component={ () => <Register /> } />
            <Route exact path="/overview" component={ () => <Overview userinfo={this.state.user} food={this.state.food} findProperItem={this.findProperItem}/> } />
            <Route exact path="/profile" component={ () => <Profile userinfo={this.state.user} /> } />
            <Route exact path="/results" component={ () => <Results food={this.state.food} findProperItem={this.findProperItem} /> } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
