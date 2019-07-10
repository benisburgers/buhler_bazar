import React, {Component} from 'react';
import ProfileForm from '../components/profileForm.js'

class Profile extends Component {

  render() {
    const { userinfo } = this.props;
    return (
      <section className="profile">
        <h2>Profile</h2>
        <ProfileForm userinfo={userinfo} />
      </section>
    )
  }
}

export default Profile;
