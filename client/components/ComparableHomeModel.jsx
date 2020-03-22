const React = require('react');
const ComparableHomeModelEntry = require('./ComparableHomeModelEntry.jsx').default;
import styles from '../style/ComparableHomeModel.css'

class ComparableHomeModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      showText: 'Show more',
      showIcon: 'down-arrow.svg'
    };
    this.onShowMoreClickHandle = this.onShowMoreClickHandle.bind(this);
  }

  onShowMoreClickHandle(event) {
    if (this.state.showMore) {
      this.setState({
        showMore: false,
        showText: 'Show more',
        showIcon: 'down-arrow.svg'
      });
    } else {
      this.setState({
        showMore: true,
        showText: 'Show less',
        showIcon: 'up-arrow.png'
      });
    }
    event.preventDefault();
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
      <div className={styles.comparableHomeModel}>
        <div className={styles.comparableHomeModelTitle}><img className={styles.iconWithSpace} src="iconfinder_House_4265801.svg"></img>Comparable Home Model</div>
        <div className={styles.comparableHomeModelExplaination}>Estimated value of this home based on local comparable homes </div>
        <div className={styles.comparableHomeModelValue}>${new Intl.NumberFormat().format(comparableEstimate)}</div>
        <div className={styles.comparableHomeModelEntries}>
          {this.props.similarAddresses.map((addressSummary, index) => {
            if (!this.state.showMore) {
              if (index < 4) {
                return (
                  <ComparableHomeModelEntry addressSummary={addressSummary} key={index} />
                );
              }
            } else {
              return (
                <ComparableHomeModelEntry addressSummary={addressSummary} key={index} />
              );
            }
          })}
          <div className={styles.showMore} onClick={this.onShowMoreClickHandle}><img className={styles.icon} src={this.state.showIcon}></img>{this.state.showText}</div>
        </div>
      </div>
    );
  }
}

export default ComparableHomeModel;
