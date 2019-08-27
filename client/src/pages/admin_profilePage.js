import React, {Component} from 'react';
import ProfileForm from '../components/profileForm.js'
import TopBarContainer from '../components/topbar.js'

class adminProfilePage extends Component {
  state = {
    targetUser: {
      //get from userList
      id: 1,
      admin: false,
      firstName: "Beni",
      lastName: "Bar-Gera",
      email: "beni@buehler-buehler.ch",
      picturePath: "https://benibargera.com/assets/images/headshot-7d571b0d4ed696cd327956ab44c4adf9.jpg"
    }
  }
  componentDidMount () {
    // const { match } = this.props;
    // const handle = match.params.id;

    // fetch(`https://api.twitter.com/user/${handle}`)
    //   .then((user) => {
    //     this.setState(() => ({ user }))
    //   })
  }
  render() {
    const targetUser = this.state.targetUser;
    const userinfo = this.props.userinfo;
    const { history, toggleFields } = this.props;
    return (
      <section className="profile">
        <TopBarContainer userinfo={userinfo} title={`${targetUser.firstName}'s Profil`} />
        <ProfileForm userinfo={targetUser} toggleFields={toggleFields} />
      </section>
    )
  }
}

export default adminProfilePage;
