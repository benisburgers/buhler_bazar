// import Customers from './components/customers/customers';
import React, { Component } from 'react';
import './App.css';
import ReactModal from 'react-modal';

/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'
import { Router, Route, Link } from 'react-router-dom'
import { UserProvider } from './components/UserContext'

import Login from './pages/login';
import Register from './pages/register';
import Overview from './pages/overview';
import AdminUserList from './pages/admin_userList';
import AdminProducts from './pages/admin_productList';

import { history } from './components/history'

class App extends Component {

  state = {
    user: {
      id: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      admin: undefined,
      lastOrderDate: undefined,
      lastOrderProducts: undefined,
      picturePath: undefined
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

  fetchUserData = async () => {
    console.log('fetchUserData()');
    fetch('/api/userData')
    .then(res => res.json())
    .then(result => {
      this.updateCurrentUser(result);
    })
    return
  }

  fetchProductsData = async () => {
    console.log('fetchProductsData()');
    fetch('/api/productsData')
    .then(res => res.json())
    .then(result => {
      return this.processProdutsData(result)
    })
    .then(result => {
      this.setState({
        products: result
      })
    })
  }

  processProdutsData = async (products) => {
    var processedProducts = await products.map(entry => {
      var clone = {
        id: entry.id,
        name: entry.productName,
        type: entry.productType,
        picturePath: `/images/products/${entry.fileName}.${entry.fileFormat}`,
        lastOrderDate: entry.lastOrderDate,
        numberOfVotes: entry.numberOfVotes
      }
      return clone;
    })
    return processedProducts
  }

  updateCurrentUser = (input) => {
    console.log('updateCurrentUser');
    var clone = Object.assign({}, input)

    //prepare input: replace null with undefiend, and set up image src, delete useless information (fileFormat)
    clone.picturePath = `/images/users/${input.fileName}.${input.fileFormat}`
    clone.lastOrderDate = clone.lastOrderDate === null ? undefined : clone.lastOrderDate
    clone.lastOrderProducts = clone.lastOrderProducts === null ? undefined : clone.lastOrderProducts
    delete clone.fileFormat;

    //check if userinfo has changed from previous state. If yes: Update state
    var cloneJSON = JSON.stringify(clone);
    var stateJSON = JSON.stringify(this.state.user);
    if (cloneJSON !== stateJSON) {
      this.setState({
        user: clone
      })
    }
  }

  componentDidMount() {
    console.log('APP componentDidMount');
    if (this.state.user.id === undefined) {
      this.fetchUserData();
    };
    this.fetchProductsData();
  }


  render() {
    return (
      <UserProvider
        value={{
          fetchUserData: this.fetchUserData,
          fetchProductsData: this.fetchProductsData,
        }}
      >
        <Router history={history}>
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
            <Route exact path="/" component={ () => <Login joke={this.state.joke} />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/overview" component={ () => <Overview fetchUserData={this.fetchUserData} userInfo={this.state.user} products={this.state.products} productTypes={this.state.productTypes} /> } />
            <Route exact path="/admin/admin_userList" component={ () => <AdminUserList userInfo={this.state.user} /> } />
            <Route exact path="/admin/admin_productList" component={ () => <AdminProducts products={this.state.products} productTypes={this.state.productTypes} userInfo={this.state.user} />} />
          </div>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
