import React, {Component} from 'react';

class Results extends Component {

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
    const { products, findProperItem } = this.props;

    return (
      <section className="results">
        <div className="topBar">
          <h2>Results</h2>
          <WeekNumber />
        </div>
        <div className="statistics">
          <ProductList products={products} findProperItem={findProperItem} rawResults={this.state.rawResults}/>
        </div>
      </section>
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
        <div className="weekNumberCircle">
          <span className="weekNumber">{getWeekNumber(new Date())}</span>
        </div>
        <span className="weekNumberDescription">Kalenderwoche</span>
      </div>

    )
  }
}

function voteScore(score) {
  let scoreArray = [];
  for (let i = 0; i < score; i++) {
    scoreArray.push(
      <li key={i}>
        <span>hand</span>
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
          <li key={index}>
            <span>{findProperItem(products, entry[0]).name}</span>
            <ul>
              {voteScore(entry[1])}
            </ul>
            <br></br>
          </li>
        )
    })

    return (
      <div>
        <ul>
          {productItems}
        </ul>
      </div>
    )
  }
}

export default Results;
