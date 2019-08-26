import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { MediumHeader, PrimaryButton, SmallHeader } from "../styling/theme"
import handIcon from "../components/images/hand.png"

class ResultsModal extends Component {
  state = {
    rawResults:
    [
      [1, 7, 5],
      [3, 9, 5],
      [4, 3, 1],
      [9, 1, 5]
    ]
  }

  render() {
    const { handleCloseModal, products, findProperItem } = this.props;
    return (
      <div className="votingModal"
        css={css`
          padding: 0px;
          height: 100%;
          overflow-y: hidden;
        `}>

        <div className="mainPart"
          css={css`
            padding: 21px;
            background: white;
            height: 80%;
            overflow: scroll;
            border-radius: 13px;
          `}
        >
          <header
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <MediumHeader>
              Results
            </MediumHeader>
            <WeekNumber />
          </header>
          <ProductList products={products} findProperItem={findProperItem} rawResults={this.state.rawResults}/>
        </div>

        <ModalButtons handleCloseModal={handleCloseModal} />
      </div>
    )
  }
}

class WeekNumber extends Component {
  render() {
    function getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
      var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
      return weekNo;
    }
    return (
      <div className="weekNumberContainer">
        <div
          css={css`
            background-color: #363636;
            box-shadow: 0 0 20px 5px rgba(0,0,0,0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            width: 60px;
            border-radius: 100%;
            margin-left: auto;
          `}
        >
          <span className="weekNumber"
            css={css`
              color: green;
              font-weight: bold;
              font-size: 25px;
            `}
          >
            {getWeekNumber(new Date())}
          </span>
        </div>
      </div>

    )
  }
}

class ModalButtons extends Component {
  render() {
    const { handleCloseModal } = this.props;
    return (
      <div
        css={css`
          position: absolute;
          bottom: 0;
          width: 100%;
          display: flex;
        `}
      >
        <PrimaryButton negative onClick={handleCloseModal}
          css={css`
            margin-left: auto;
            width: 25%;
          `}
        >
          X
        </PrimaryButton>
      </div>
    )
  }
}

function voteScore(score) {
  let scoreArray = [];
  for (let i = -30; i < score; i++) {
    scoreArray.push(
      <li key={i}
        css={css`
          margin-right: 5px;
        `}
      >
        <img src={handIcon} alt="Hand Icon"
          css={css`
            max-width: 15px;
            color: green;
          `}
        />
      </li>
    )
  }
  return scoreArray
}

class ProductList extends Component {

  render() {
    // access raw results from state (each array represents one user's choice for the week) (rawResults)
    const { products, findProperItem, rawResults } = this.props;

    //merge all these choices into one array (mergedResults)
    var mergedResults = [].concat.apply([], rawResults);

    // create an object with each key representing one product id and the value representing how often it was chosen (mergedResults => counts)
    var counts = {};
    for (let vote of mergedResults) {
      counts[vote] = counts[vote] ? counts[vote] + 1 : 1;
    }

    // create an array of sub-array pairs [product.id, votes for this product] (sortedCounts)
    var sortedCounts = [];
    for (let eachCount in counts) {
      sortedCounts.push([parseInt(eachCount), counts[eachCount]])
    };

    //sort this array by votes (the more votes a product has, the earlier it is in the arrray)
    sortedCounts.sort((a, b) => b[1] - a[1]);

    //map through each product in sortedCounts and return the number of hands for each of its votes
    let productItems = sortedCounts.map((entry, index) => {
        return (
          <li key={index} className="oneProduct">
            <SmallHeader>{findProperItem(products, entry[0]).name}</SmallHeader>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              `}
            >
              <ul
                css={css`
                  list-style: none;
                  padding: 0;
                  display: flex;
                  flex-wrap: wrap;
                `}
              >
                {voteScore(entry[1])}
              </ul>
              <img src={findProperItem(products, entry[0]).picturePath} alt={findProperItem(products, entry[0]).name}
                css={css`
                  max-width: 60px;
                `}
              />
            </div>
          </li>
        )
    })

    return (
      <div>
        <ul
          css={css`
            list-style: none;
            padding: 0;
          `}
        >
          {productItems}
        </ul>
      </div>
    )
  }
}

export default ResultsModal
