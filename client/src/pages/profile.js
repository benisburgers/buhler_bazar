import React, {Component} from 'react';
import ProfileForm from '../components/profileForm.js';
import {withRouter} from 'react-router-dom';

class Profile extends Component {
  render() {

    const { userinfo, history } = this.props;
    return (
      <section className="profile">
        <button onClick={history.goBack}>back</button>
        <ProfileForm userinfo={userinfo} />
      </section>
    )
  }
}

export default Profile;
