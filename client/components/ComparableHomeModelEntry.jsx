const React = require('react');
import styles from '../style/ComparableHomeModelEntry.css';

class ComparableHomeModelEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  render() {
    return (
      // test if the below render
      // <div>{JSON.stringify(this.props.addressSummary)}</div>
      <div className={styles.ComparableHomeModelEntry}>
        {/* <div>Address: {this.props.addressSummary.address}</div> */}
        <div>
          <img className={styles.image} src="https://photos.zillowstatic.com/p_h/ISbd8ki9klk0ki1000000000.jpg"></img>
        </div>
        <div className={styles.homeSummary}>
          <div className={styles.homeValue}>
            <div>${new Intl.NumberFormat().format(this.props.addressSummary.currentestimatedvalue)}</div>
            <div className={styles.forSale}>sale: {this.props.addressSummary.on_market}</div>
          </div>
          <div className={styles.homeValuePerSqft}>
            ${new Intl.NumberFormat().format((this.props.addressSummary.currentestimatedvalue / this.props.addressSummary.sqft).toFixed(2))}/sqft
            </div>
          <div className={styles.homeDetails}>
            <span className={styles.detailNumber}>{this.props.addressSummary.bed}</span> <span> bd</span>
            <div className={styles.detailSpacing}></div>
            <span className={styles.detailNumber}>{this.props.addressSummary.bath}</span><span> ba</span>
            <div className={styles.detailSpacing}></div>
            <span className={styles.detailNumber}>{this.props.addressSummary.sqft}</span> <span> sqft</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ComparableHomeModelEntry;
