import React, {Component} from 'react';

class Overview extends Component {

  state = {
    modalOpen: false,
  }

  toggleModal = () => {
    var modalOpen = this.state.modalOpen;
    this.setState({
      modalOpen: !modalOpen,
    })
  }

  render() {
    const { userinfo, fruits} = this.props;
    const { modalOpen } = this.state;
    return (
      <section className="overview">
        <h2>Overview</h2>
        <TopBar userinfo={userinfo} />
        <OverviewInfo userinfo={userinfo} fruits={fruits} />
        <OverviewButtons toggleModal={this.toggleModal} />
        <VotingModal fruits={fruits} modalOpen={modalOpen} toggleModal={this.toggleModal} />
      </section>
    );
  };
}

class TopBar extends Component {
  render() {
    const { userinfo } = this.props;
    return (
      <div className="topBar">
        <ProfileButton userinfo={userinfo} />
      </div>
    )
  }
}

class ProfileButton extends Component {
  render() {
    const { userinfo } = this.props;
    return (
      <div className="profileButton" userinfo={userinfo}>
        <ProfileThumbnail userinfo={userinfo} />
        <span>Fuud</span>
        <Hamburger />
      </div>
    )
  }
}

class ProfileThumbnail extends Component {
  render() {
    const { userinfo } = this.props;
    return (
      <div className="profileThumbnail">
        <span>{ userinfo.data.picturePath }</span>
        <br></br>
        <span>{`${userinfo.data.firstName} ${userinfo.data.lastName}`}</span>
      </div>
    )
  }
}

class Hamburger extends Component {
  render() {
    return (
      <div className="hamburger">
        <span>Hamburger</span>
      </div>
    )
  }
}

class OverviewInfo extends Component {
  render() {
    const { userinfo, fruits } = this.props;
    return (
      <div className="overviewInfo">
        <CountDown />
        <PreviousOrder userinfo={userinfo} fruits={fruits} />
      </div>
    )
  }
}


class CountDown extends Component {
  render() {
    return (
      <div className="countDown">
        <span>Dä nöchschti Ichauf folgt in</span>
        <br></br>
        <span> <DaysLeft /> TÄG</span>
      </div>
    )
  }
}

function DaysLeft(props) {
  var nextMonday = new Date();
  var today = new Date();
  nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
  const diffTime = Math.abs(nextMonday.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function findProperFruit(array, entry) {
  return(array.find(fruit => fruit.id === entry));
}


class PreviousOrder extends Component {
  render() {
    const { userinfo, fruits } = this.props;

    const dateString = (() => {
      var previousOrderDate = new Date(userinfo.order.lastOrderDate);
      var options = { month: 'long', day: 'numeric' };
      return previousOrderDate.toLocaleDateString('de-DE', options);
    })

    const previousOrder = userinfo.order.lastOrder.map((entry, index) => {
      return (
        <li key={index}>
          <span>{findProperFruit(fruits, entry).name}</span>
          <br></br>
          <span>{findProperFruit(fruits, entry).picturePath}</span>
        </li>
      )
    })

    return (
      <div className="previousOrder">
        <span>Dis Voting am {dateString}</span>
        <ul className="previousOrderList">
          {previousOrder}
        </ul>
      </div>
    )
  }
}

class OverviewButtons extends Component {
  render() {
    const  { toggleModal } = this.props;
    return (
      <div className="overviewButtons">
        <button>TSCHARTS</button>
        <button onClick={toggleModal}>VOUTÄ</button>
      </div>
    )
  }
}

class VotingModal extends Component {
  render() {
    const { fruits, toggleModal, modalOpen } = this.props;
    if (modalOpen) {
      return (
        <div className="votingModal">
          <h4>Vout für dini Lieblings</h4>
          <CreditScore />
          <FoodList fruits={fruits} />
          <ModalButtons toggleModal={toggleModal} />
        </div>
      )
    }
    else {
      return null;
    }
  }
}

class CreditScore extends Component {
  render() {
    return (
      <div className="creditScore">
        <span>3</span>
        <span>CRÄDITS</span>
      </div>
    )
  }
}

class FoodList extends Component {
  render() {
    const { fruits } = this.props;
    const fruitItems = fruits.map((entry, index) => {
      return (
        <li key={index}>
          <span>{entry.name}</span>
          <br></br>
          <span>{entry.picturePath}</span>
          <br></br>
          <br></br>
        </li>
      )
    })

    return (
      <ul className="foodList">
        {fruitItems}
      </ul>
    )
  }
}

class ModalButtons extends Component {
  render() {
    const { toggleModal } = this.props;
    return (
      <div>
        <button>VOUTÄ</button>
        <button onClick={toggleModal}>X</button>
      </div>
    )
  }
}


export default Overview;
