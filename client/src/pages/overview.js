import React, {Component} from 'react';
import './css/overview.css'

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
    const { userinfo, food} = this.props;
    const { modalOpen } = this.state;
    return (
      <section className="overview">
        <h2>Overview</h2>
        <TopBar userinfo={userinfo} />
        <OverviewInfo userinfo={userinfo} food={food} />
        <OverviewButtons toggleModal={this.toggleModal} />
        <VotingModal food={food} modalOpen={modalOpen} toggleModal={this.toggleModal} />
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
        <span>{ userinfo.picturePath }</span>
        <br></br>
        <span>{`${userinfo.firstName} ${userinfo.lastName}`}</span>
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
    const { userinfo, food } = this.props;
    return (
      <div className="overviewInfo">
        <CountDown />
        <PreviousOrder userinfo={userinfo} food={food} />
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

function findProperItem(array, entry) {
  return(array.find(fruit => fruit.id === entry));
}


class PreviousOrder extends Component {
  render() {
    const { userinfo, food } = this.props;

    const dateString = (() => {
      var previousOrderDate = new Date(userinfo.lastOrderDate);
      var options = { month: 'long', day: 'numeric' };
      return previousOrderDate.toLocaleDateString('de-DE', options);
    })

    const previousOrder = userinfo.lastOrder.map((entry, index) => {
      return (
        <li key={index}>
          <span>{findProperItem(food, entry).name}</span>
          <br></br>
          <span>{findProperItem(food, entry).picturePath}</span>
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

  state = {
    selectedProducts: [],
    credits: 4,
    creditClassName: 'creditScore'
  }

  highlightCredit = () => {
    console.log('highlightCredit');
    const { creditClassName } = this.state;
    this.setState({
      creditClassName: 'creditScore highlight'
    })
    setTimeout(() => {
      this.setState({
        creditClassName: "creditScore"
      })
    }, 500);
  }

  chooseProduct = (e, product) => {
    console.log('chooseProduct');

    let productType = product.type
    let clickedTarget = e.currentTarget

    //is this product activated? I.e does it exist in selectedProducts?
      //yes: this product has been selected (unchoose it)
      if (this.state.selectedProducts.includes(product)) {

        // ==> remove fruit from selectedProducts
        let selectedProducts = this.state.selectedProducts;
        let newSelectedProducts = selectedProducts.filter(item => item !== product)
        this.setState({
          selectedProducts: newSelectedProducts
        })

        // ==> increase credit
        this.setState((state) => {
          return {
            credits: state.credits + 1
          }
        })

        // ==> deactivate fruit (visually)
        clickedTarget.classList.remove("active")
      }

      //no: this product has not been selcted (choose it)
      else {

        //are there any more credits left?
        //yes (there are credits left) ==>
        if (this.state.credits > 0) {
            // ==> add fruit to selectedProducts
            let selectedProducts = this.state.selectedProducts;
            let newSelectedProducts = [...selectedProducts, product];
            this.setState({
              selectedProducts: newSelectedProducts
            })

            // ==> decrease credits
            this.setState((state => {
              return {
                credits: state.credits - 1
              }
            }))

            // ==> activate fruit (visually)
            clickedTarget.classList.add("active")
        }

        //no (there are no credits left) ==>
        else {
            // ==> highlight credits for a second
            this.highlightCredit();
        }
      }
  }

  submitVote = () => {
    console.log('submitVote');
    //push selected fruits to database -- what format?
    let chosenProductIDs = [];
    this.state.selectedProducts.map((entry, index) => {
      chosenProductIDs = [...chosenProductIDs, entry.id];
    })
    // close voting modal
    this.props.toggleModal();
    //refresh overview page (update/fetch 'previous voting')
  }

  render() {
    const { food, toggleModal, modalOpen } = this.props;
    const { credits, creditClassName, selectedProducts } = this.state;
    if (modalOpen) {
      return (
        <div className="votingModal">
          <h4>Vout für dini Lieblings</h4>
          <CreditScore credits={credits} creditClassName={creditClassName} />
          <FoodList food={food} chooseProduct={this.chooseProduct} />
          <ModalButtons submitVote={this.submitVote} toggleModal={toggleModal} selectedProducts={selectedProducts}/>
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
    const { credits, creditClassName } = this.props;
    return (
      <div className={creditClassName}>
        <span>{credits}</span>
        <span>CRÄDITS</span>
      </div>
    )
  }
}

class FoodList extends Component {
  render() {
    const { food, chooseProduct } = this.props;
    const foodItems = food.map((entry, index) => {
      return (
        <li key={index} onClick={ (e) => chooseProduct(e, entry) }>
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
        {foodItems}
      </ul>
    )
  }
}

class ModalButtons extends Component {
  render() {
    const { submitVote, toggleModal, selectedProducts } = this.props;
    if ( selectedProducts.length > 0 ) {
      return (
        <div>
          <button onClick={submitVote}>VOUTÄ</button>
          <button onClick={toggleModal}>X</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <button onClick={toggleModal}>X</button>
        </div>
      )
    }
  }
}


export default Overview;
