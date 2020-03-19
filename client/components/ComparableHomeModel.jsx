const React = require('react');
const ComparableHomeModelEntry = require('./ComparableHomeModelEntry.jsx').default;

class ComparableHomeModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.onShowMoreClickHandle = this.onShowMoreClickHandle.bind(this);
  }
  onShowMoreClickHandle(event) {

  }

  render() {
    let comparableEstimate = 0;
    let onMarketCount = 0;
    // console.log(this.props.similarAddresses);
    for (let i = 0; i < this.props.similarAddresses.length; i += 1) {
      if (this.props.similarAddresses[i].on_market === "true") {
        comparableEstimate += this.props.similarAddresses[i].currentestimatedvalue;
        onMarketCount += 1;
      }
    }
    comparableEstimate /= onMarketCount;
    // test if comparableEstimate is a calculated to be an appropriate number
    return (
      <div>
        <h2>Comparable Home Model</h2>
        <p>Estimated value of this home based on local comparable homes: ${comparableEstimate}</p>
        {this.props.similarAddresses.map((addressSummary, index) => {
          return (
            <ComparableHomeModelEntry addressSummary={addressSummary} key={index} />
          );
        })}
      </div>
    );
  }
}

export default ComparableHomeModel;
