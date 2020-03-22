const React = require('react');
const $ = require('jquery');
const ComparableHomeModel = require('./ComparableHomeModel.jsx').default;
import styles from '../style/HomeValueApp.css';

class HomeValueApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressSummary: 'request data',
      addressValues: 'request data',
      similarAddresses: 'requet data',
      hasData: false,
      showEstimateModels: { visibility: 'hidden' },
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'get',
      url: '/exampleHomeSummary/',
      data: {
        address: '167 Rozella Villages Parker Highway, Lake Lavonneborough, Illinois, 36019',
        zipCode: 36019,
      },
      success: (result) => this.setState({
        addressSummary: result.addressSummary,
        addressValues: result.addressValues,
        similarAddresses: result.similarAddresses,
        hasData: true,
      }),
    });
  }

  // test onclick targetting the right 'this'
  onClickHandler(event) {
    if (this.state.showEstimateModels.visibility === 'hidden') {
      this.setState({ showEstimateModels: { visibility: 'visible' } });
    } else if (this.state.showEstimateModels.visibility === 'visible') {
      this.setState({ showEstimateModels: { visibility: 'hidden' } });
    }
    event.preventDefault();
  }

  render() {
    if (this.state.hasData) {
      // console.log(this.state);
      let bestimate = 0;
      let bestimateRangeLow = this.state.addressSummary.currentestimatedvalue;
      let bestimateRangeHigh = this.state.addressSummary.currentestimatedvalue;
      for (let i = 0; i < this.state.similarAddresses.length; i += 1) {
        bestimate += this.state.similarAddresses[i].currentestimatedvalue;
        if (this.state.similarAddresses[i].currentestimatedvalue < bestimateRangeLow) {
          bestimateRangeLow = this.state.similarAddresses[i].currentestimatedvalue;
        }
        if (this.state.similarAddresses[i].currentestimatedvalue > bestimateRangeHigh) {
          bestimateRangeHigh = this.state.similarAddresses[i].currentestimatedvalue;
        }
      }
      bestimate /= this.state.similarAddresses.length;
      return (
        // console.log('check if the content is fetched')
        <div className={styles.homeValueApp}>
          <div className={styles.appTitle}>Home value</div>
          <div>
            <div className={styles.bestimateSection}>
              <div className={styles.bestimate}>
                <div className={styles.bestimateTrademark}>Bestimate</div>
                <div className={styles.bestimateNumber}>${new Intl.NumberFormat().format(parseInt(bestimate))}</div>
              </div>
              <div className={styles.bestimateRange}>Bestimate sale range: ${new Intl.NumberFormat().format(bestimateRangeLow)} - ${new Intl.NumberFormat().format(bestimateRangeHigh)}</div>
            </div>
          </div>
          <button onClick={this.onClickHandler} className={styles.showEstimateModelsButton}><img className={styles.icon} src="down-arrow.svg"></img>See more estimated models</button>
          
          <div style={this.state.showEstimateModels} className={styles.bestimateModelsSection}>
            <div>
              <div className={styles.bestimateModelTitle}>Bestimate models</div>
              <div className={styles.bestimateModelExplaination}>The Bestimate uses a set of data models to estimate this home's value.</div>
              <div className={styles.differentModels}>
                <span className={styles.modelNames}>
                  <img className={styles.iconWithSpace} src="iconfinder_House_4265801.svg"></img>
                  <span> Comparable homes</span>
                </span>
                <span className={styles.modelNames}>
                  <img className={styles.iconWithSpace} src="iconfinder_m-21_4230540.svg"></img>
                  <span> Off-market model</span>
                </span>
              </div>
            </div>
            {/* for test: show the component below rendered and if the error is at this level or at the child level */}
            <ComparableHomeModel similarAddresses={this.state.similarAddresses} />
            {/* add the below portion into a test >> */}
            {/* homeSummary:
            {JSON.stringify(this.state.similarAddresses)} */}
            {/* << */}
          </div>
        </div>
      );
    } else {
      return (<div>Hello World!</div>)
    }
  }
}

export default HomeValueApp;
