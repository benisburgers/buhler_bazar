// import Customers from './components/customers/customers';
import React, { Component } from 'react';
import './App.css';
import ReactModal from 'react-modal';

/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

import Login from './pages/login';
import Register from './pages/register';
import Overview from './pages/overview';
import Profile from './pages/profile';
import Results from './pages/results';
import AdminUserList from './pages/admin_userList';
import AdminProducts from './pages/admin_productList';
import AdminProductPage from './pages/admin_productPage';
import AdminProfilePage from './pages/admin_profilePage';

class App extends Component {

  state = {
    user: {
      //get from userList
      id: 1,
      admin: true,
      firstName: "Marko",
      lastName: "Lukac",
      email: "marko@buehler-buehler.ch",
      picturePath: "https://pbs.twimg.com/profile_images/966014949377085440/4Ttk9Ose_400x400.jpg",
      //get from userOrderTable_Marko
      lastOrderDate: "2019-06-21T13:46:03.995Z",
      lastOrder: [1, 2, 3],
      favoriteProduct: 3
    },
    products: [
      {
        id: 1,
        name: "Banane",
        type: "fruit",
        picturePath: "https://bit.ly/2OAYdUz"
      },
      {
        id: 2,
        name: "Apfel",
        type: "fruit",
        picturePath: "https://bit.ly/2FxkRIR"
      },
      {
        id: 3,
        name: "Birre",
        type: "fruit",
        picturePath: "https://bit.ly/2LWtD5A"
      },
      {
        id: 4,
        name: "Pfirsich",
        type: "fruit",
        picturePath: "https://bit.ly/2LWtD5A"
      },
      {
        id: 5,
        name: "Truube",
        type: "fruit",
        picturePath: "https://bit.ly/2FxkRIR"
      },
      {
        id: 6,
        name: "Avocado",
        type: "fruit",
        picturePath: "https://bit.ly/2OAYdUz"
      },
      {
        id: 7,
        name: "Chips",
        type: "snack",
        picturePath: "https://bit.ly/2OAYdUz"
      },
      {
        id: 8,
        name: "Cashew",
        type: "snack",
        picturePath: "https://bit.ly/2LWtD5A"
      },
      {
        id: 9,
        name: "Troche Ananas",
        type: "snack",
        picturePath: "https://bit.ly/2LWtD5A"
      }
    ],
    productTypes: ['fruit', 'snack']
  }

  findProperItem(array, entry) {
    return(array.find(fruit => fruit.id === entry));
  }
  render() {
    return (
        <div className="App" id="main">
        <Global
          styles={css`
            html, body, #root, #main {
              height: 100%;
            }
            * {
              &:active {
                -webkit-tap-highlight-color: transparent;
              }
              &:focus {
                outline-color: transparent;
              }
            }
          `}
        />
          <Router>
            <Switch>
              <Route exact path="/" component={ () => <Login joke={this.state.joke} />} />
              <Route exact path="/register" render={({history}) => <Register history={history} />} />
              <Route exact path="/overview" component={ () => <Overview userinfo={this.state.user} products={this.state.products} findProperItem={this.findProperItem} productTypes={this.state.productTypes} /> } />
              <Route path="/profile" render={({history}) => <Profile history={history} userinfo={this.state.user} />} />
              <Route path="/results" render={({history}) => <Results history={history} products={this.state.products} findProperItem={this.findProperItem} />} />
              <Route exact path="/admin/admin_userList" component={ () => <AdminUserList userinfo={this.state.user} /> } />
              <Route path="/admin/admin_profilePage/:id" render={({match, history}) => <AdminProfilePage match={match} history={history} userinfo={this.state.user}/>} />
              <Route exact path="/admin/admin_productList" component={ () => <AdminProducts products={this.state.products} productTypes={this.state.productTypes} userinfo={this.state.user} />} />
              <Route path="/admin/admin_productPage/:id" render={({match, history}) => <AdminProductPage findProperItem={this.findProperItem} products={this.state.products} productTypes={this.state.productTypes} match={match} history={history} />} />
            </Switch>
          </Router>
        </div>
    );
  }
}

export default App;
