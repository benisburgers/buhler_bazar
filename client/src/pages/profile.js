import React, {Component} from 'react';
import ProfileForm from '../components/profileForm.js';

class Profile extends Component {
  render() {

    const { userinfo, history, toggleFields } = this.props;
    return (
      <section className="profile">
        <button onClick={history.goBack}>back</button>
        <ProfileForm userinfo={userinfo} toggleFields={toggleFields} />
      </section>
    )
  }
}

export default Profile;
