const React = require('react');
import styles from '../style/ComparableHomeModelEntry.css';
const $ = require('jquery');

class ComparableHomeModelEntry extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.addressSummary.on_market === 'true') {
      this.state = {
        saleIcon: "Button_Icon_Red.svg"
      };
    } else {
      this.state = {
        saleIcon: "Gray_Light_Icon.svg"
      };
    }
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(event) {
    // test if the correct data is being sent
    $.ajax({
      type: 'get',
      url: '/exampleHomeSummary/',
      data: {
        address: this.props.addressSummary.address,
        zipCode: this.props.addressSummary.zipcode,
      },
      success: (result) => {
        this.props.onClickNewAddressShowMoreHandler();
        this.props.onClickNewAddressHandler(result);
        window.scrollTo(0, 0);
      },
    });
    event.preventDefault();
  }

  render() {
    return (
      // test if the below render
      // <div>{JSON.stringify(this.props.addressSummary)}</div>
      <div className={styles.ComparableHomeModelEntry} onClick={this.onClickHandler}>
        {/* <div>Address: {this.props.addressSummary.address}</div> */}
        <div className={styles.upperSide}>
          <img className={styles.image} src="https://photos.zillowstatic.com/p_h/ISbd8ki9klk0ki1000000000.jpg"></img>
          <img className={styles.heart} src="heart.svg"></img>
        </div>
        <div className={styles.homeSummary}>
          <div className={styles.homeValue}>
            <div>${new Intl.NumberFormat().format(this.props.addressSummary.currentestimatedvalue)}</div>
            <div className={styles.forSale}>
              <img className={styles.icon} src={this.state.saleIcon}></img></div>
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
