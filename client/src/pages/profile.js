import React, {Component} from 'react';

class Profile extends Component {

  render() {
    return (
      <section className="profile">
        <h2>Profile</h2>
        <ProfileForm />
      </section>
    )
  }
}

class ProfileForm extends Component {
  render() {
    return (
      <form>
        <label>
          Profilbild
          <input type="file"></input>
        </label>
        <label>
          <input type="text" name="fullName" placeholder="Marko Lukac"></input>
          <span style={{ whiteSpace: 'nowrap' }}>Name ändere</span>
        </label>
        <label>
          <input type="text" name="email" placeholder="marko@buehler-buehler.ch"></input>
          <span style={{ whiteSpace: 'nowrap' }}>E-Mail apasse</span>
        </label>
        <input type="submit" value="OKE" />
      </form>
    )
  }
}

export default Profile;
