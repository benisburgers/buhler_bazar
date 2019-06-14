import React, {Component} from 'react';

class Login extends Component {


  render() {
    return (
      <section class="login">
          <h2>Login</h2>
          <LoginText />
          <LoginForm />
      </section>
    );
  };
}

class LoginForm extends Component {
  render() {
    return (
      <form>
        <input type="text" name="email" placeholder="jusärnejm" />
        <input type="text" name="email" placeholder="●●●●●●●"/>
        <input type="submit" value="LOG DI I" />
        <button>Registrierä</button>
      </form>
    )
  }
}

class LoginText extends Component {
  render() {
    return (
      <div>
        <h3>Büehlerbazar</h3>
        <p>Mit m BüehlermärtApp...</p>
        <p>Log di ii...</p>
      </div>
    )
  }
}

export default Login;
