import React, {Component} from 'react';
import ProfileForm from '../components/profileForm.js';

class Profile extends Component {
  render() {

    const { userinfo, history, toggleFields } = this.props;
    return (
      <section className="profile">
        <ProfileForm userinfo={userinfo} toggleFields={toggleFields} />
      </section>
    )
  }
}

export default Profile;
