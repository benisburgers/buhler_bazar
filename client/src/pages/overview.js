import React, {Component} from 'react';

class Overview extends Component {
  render() {
    return (
      <section class="overview">
        <h2>Overview</h2>
        <TopBar />
        <OverviewInfo />
        <OverviewButtons />
        <VotingModal />
      </section>
    );
  };
}

class TopBar extends Component {
  render() {
    return (
      <div class="topBar">
        <ProfileButton />
      </div>
    )
  }
}

class ProfileButton extends Component {
  render() {
    return (
      <div class="profileButton">
        <ProfileThumbnail />
        <span>Fuud</span>
        <Hamburger />
      </div>
    )
  }
}

class ProfileThumbnail extends Component {
  render() {
    return (
      <div class="profileThumbnail">
        <span>User Image</span>
        <span>User Name</span>
      </div>
    )
  }
}

class Hamburger extends Component {
  render() {
    return (
      <div class="hamburger">
        <span>Hamburger</span>
      </div>
    )
  }
}

class OverviewInfo extends Component {
  render() {
    return (
      <div class="overviewInfo">
        <CountDown />
        <PreviousOrder />
      </div>
    )
  }
}


class CountDown extends Component {
  render() {
    return (
      <div class="countDown">
        <span>Dä nöchschti Ichauf folgt in</span>
        <span>FOIF TÄG</span>
      </div>
    )
  }
}

class PreviousOrder extends Component {
  render() {
    return (
      <div class="previousOrder">
        <span>Dini Votings am 21. Juni</span>
        <ul class="previousOrderList">
          <li>
            <span>Mango Image</span>
            <span>Mango</span>
          </li>
          <li>
            <span>Banana Image</span>
            <span>Bananä</span>
          </li>
          <li>
            <span>Cashew Image</span>
            <span>Cäschju</span>
          </li>
        </ul>
      </div>
    )
  }
}

class OverviewButtons extends Component {
  render() {
    return (
      <div class="overviewButtons">
        <button>TSCHARTS</button>
        <button>VOUTÄ</button>
      </div>
    )
  }
}

class VotingModal extends Component {
  render() {
    return (
      <div class="votingModal">
        <h3>VOTING MODAL</h3>
        <h4>Vout für dini Lieblings</h4>
        <CreditScore />
        <FoodList />
        <ModalButtons />
      </div>
    )
  }
}

class CreditScore extends Component {
  render() {
    return (
      <div class="creditScore">
        <span>3</span>
        <span>CRÄDITS</span>
      </div>
    )
  }
}

class FoodList extends Component {
  render() {
    return (
      <ul class="foodList">
        <li>
          <span>Mango.Image</span>
          <span>Mango.Name</span>
        </li>
        <li>
          <span>Banana.Image</span>
          <span>Banan.Name</span>
        </li>
        <li>
          <span>Kiwi.Image</span>
          <span>Kiwi.Name</span>
        </li>
      </ul>
    )
  }
}

class ModalButtons extends Component {
  render() {
    return (
      <div>
        <button>VOUTÄ</button>
        <button>X</button>
      </div>
    )
  }
}


export default Overview;
