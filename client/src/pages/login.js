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

  state = {
    value: 'lol',
    email: '',
    password: '',
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="email"
          placeholder="jusärnejm"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="●●●●●●●"
          value={this.state.password}
          onChange={this.handleChange}
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
