import React, {Component} from 'react';
import OverviewProductList from '../components/overviewProductList.js'


class VotingModal extends Component {

  render() {
    const { food, toggleModal, modalOpen, productTypes } = this.props;
    if (modalOpen) {
      return (
        <div className="votingModal">
          <h4>Vout für dini Lieblings</h4>
          <OverviewProductList productTypes={productTypes} products={food} toggleModal={toggleModal} />
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default VotingModal;
