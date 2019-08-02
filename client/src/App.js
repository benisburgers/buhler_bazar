// import Customers from './components/customers/customers';
import React, { Component } from 'react';
import './App.css';

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
        picturePath: "https://bit.ly/2FxkRIR"
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
    ],
    productTypes: ['fruit', 'snack']
  }

  findProperItem(array, entry) {
    return(array.find(fruit => fruit.id === entry));
  }

  toggleFields(context, fieldName) {
    console.log('toggleFields');
    let origDisabledFields = context.state.disabledFields;
    let newDisabledFields = Object.assign({}, ...Object.keys(origDisabledFields).map(k => ({[k]: true})));
    newDisabledFields[fieldName] = false;
    context.setState({
      disabledFields: newDisabledFields
    })
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
              <li><Link to={'/admin/admin_userList'}>AdminUserList</Link></li>
              <li><Link to={'/admin/admin_productList'}>AdminProducts</Link></li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/" component={ () => <Login joke={this.state.joke} /> } />
            <Route exact path="/register" render={({history}) => <Register history={history} />} />
            <Route exact path="/overview" component={ () => <Overview userinfo={this.state.user} products={this.state.products} findProperItem={this.findProperItem} productTypes={this.state.productTypes} /> } />
            <Route path="/profile" render={({history}) => <Profile history={history} userinfo={this.state.user} toggleFields={this.toggleFields} />} />
            <Route path="/results" render={({history}) => <Results history={history} products={this.state.products} findProperItem={this.findProperItem} />} />
            <Route exact path="/admin/admin_userList" component={ () => <AdminUserList userinfo={this.state.user} /> } />
            <Route path="/admin/admin_profilePage/:id" render={({match, history}) => <AdminProfilePage match={match} history={history} toggleFields={this.toggleFields} />} />
            <Route exact path="/admin/admin_productList" component={ () => <AdminProducts products={this.state.products} productTypes={this.state.productTypes} userinfo={this.state.user} /> } />
            <Route path="/admin/admin_productPage/:id" render={({match, history}) => <AdminProductPage toggleFields={this.toggleFields} findProperItem={this.findProperItem} products={this.state.products} match={match} history={history} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
