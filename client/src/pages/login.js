import React, {Component} from 'react';


class Login extends Component {


  render() {
    return (
      <section class="login">
          <h2>Login</h2>
          <LoginText />
          <LoginForm />
          <RegisterButton />
      </section>
    );
  };
}

class LoginForm extends Component {
  render() {
    return (
      <form>
        <input
          type="text"
          name="email"
          placeholder="jusärnejm"
        />
        <input
          type="text"
          name="email"
          placeholder="●●●●●●●"
        />
        <input
          type="submit"
          value="LOG DI I"
        />
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

class RegisterButton extends Component {
  render() {
    return (
      <button>Registrierä</button>
    )
  }
}

export default Login;
