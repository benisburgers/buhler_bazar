import React, {Component} from 'react';
import ProfileForm from '../components/profileForm.js';
import TopBarContainer from '../components/topbar.js'

class Profile extends Component {
  render() {

    const { userinfo, history, toggleFields } = this.props;
    return (
      <section className="profile">
        <TopBarContainer userinfo={userinfo} title="PROFIL" />
        <ProfileForm userinfo={userinfo} toggleFields={toggleFields} />
      </section>
    )
  }
}

export default Profile;
