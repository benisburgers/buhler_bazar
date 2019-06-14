import React, {Component} from 'react';

class Register extends Component {
  render() {
    return (
      <section class="registration">
        <h2>Register</h2>
        <RegistrationForm />
        <BackButton />
      </section>
    )
  }
}

class RegistrationForm extends Component {
  render() {
    return (
      <form>
        <label>Profilbild uelade
          <input type="file"></input>
        </label>
        <input type="text" name="firstName" placeholder="vornamä"></input>
        <input type="text" name="lastName" placeholder="nachnamä"></input>
        <input type="text" name="email" placeholder="imail"></input>
        <input type="text" name="password" placeholder="●●●●●●●●"></input>
        <input type="submit" value="Registrierä" />
      </form>
    )
  }
}

class BackButton extends Component {
  render() {
    return (
      <button>Zrugg</button>
    )
  }
}

export default Register;
